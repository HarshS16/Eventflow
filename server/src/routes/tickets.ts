import { Router, Response } from 'express';
import { supabase, createAuthClient } from '../db/supabase.js';
import { authMiddleware, AuthRequest } from '../middleware/authMiddleware.js';
import { generateQRToken } from '../services/qr.service.js';
import { sendTicketEmail, sendBulkTicketEmails, formatEventDate } from '../services/email.service.js';

// Helper to get auth-aware Supabase client
function getAuthSupabase(req: AuthRequest) {
    if (req.authToken) {
        return createAuthClient(req.authToken);
    }
    return supabase;
}

export const ticketsRouter = Router();

interface EventRegistration {
    id: string;
    event_id: string;
    full_name: string;
    email: string;
    status: string;
}

interface Event {
    id: string;
    title: string;
    event_date: string | null;
    location: string | null;
    organizer_id: string;
}

interface Ticket {
    id: string;
    registration_id: string;
    event_id: string;
    participant_email: string;
    participant_name: string;
    qr_code_data: string;
    qr_issued_at: string;
    qr_used_at: string | null;
    status: string;
    created_at: string;
    events?: Event;
}

// Issue tickets to all approved participants for an event (bulk)
ticketsRouter.post('/issue-bulk/:eventId', authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        const { eventId } = req.params;
        const userId = req.user?.id;
        const authSupabase = getAuthSupabase(req);

        // Verify event exists and user is the organizer
        const { data: event, error: eventError } = await authSupabase
            .from('events')
            .select('*')
            .eq('id', eventId)
            .single();

        if (eventError || !event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        const eventData = event as unknown as Event;
        if (eventData.organizer_id !== userId) {
            return res.status(403).json({ error: 'Unauthorized - Not the event organizer' });
        }

        // Get all approved registrations for this event
        const { data: registrations, error: regError } = await authSupabase
            .from('event_registrations')
            .select('*')
            .eq('event_id', eventId)
            .eq('status', 'approved');

        if (regError) {
            throw regError;
        }

        const regs = (registrations || []) as unknown as EventRegistration[];

        if (regs.length === 0) {
            return res.status(400).json({ error: 'No approved registrations found for this event' });
        }

        // Get existing tickets to avoid duplicates
        const { data: existingTickets } = await authSupabase
            .from('event_tickets' as any)
            .select('registration_id')
            .eq('event_id', eventId);

        const existingRegIds = new Set(((existingTickets || []) as unknown as { registration_id: string }[]).map((t) => t.registration_id));

        // Filter out registrations that already have tickets
        const newRegistrations = regs.filter(r => !existingRegIds.has(r.id));

        if (newRegistrations.length === 0) {
            return res.status(400).json({ error: 'All approved participants already have tickets' });
        }

        // Create tickets for each registration
        const ticketsToCreate = newRegistrations.map(reg => ({
            registration_id: reg.id,
            event_id: eventId,
            participant_email: reg.email,
            participant_name: reg.full_name,
            qr_code_data: generateQRToken(),
            status: 'issued'
        }));

        const { data: createdTickets, error: ticketError } = await authSupabase
            .from('event_tickets' as any)
            .insert(ticketsToCreate)
            .select();

        if (ticketError) {
            throw ticketError;
        }

        // Send emails to all participants (don't block if emails fail)
        let emailResults = { successful: 0, failed: 0, errors: [] as Array<{ email: string; error: string }> };

        try {
            const emailData = (createdTickets as unknown as Ticket[]).map(ticket => ({
                recipientEmail: ticket.participant_email,
                recipientName: ticket.participant_name,
                eventTitle: eventData.title,
                eventDate: formatEventDate(eventData.event_date),
                eventLocation: eventData.location || 'TBA',
                qrCodeData: ticket.qr_code_data,
                ticketId: ticket.id
            }));

            emailResults = await sendBulkTicketEmails(emailData);
        } catch (emailError) {
            console.error('Email sending failed:', emailError);
            emailResults.failed = createdTickets?.length || 0;
            emailResults.errors.push({ email: 'all', error: emailError instanceof Error ? emailError.message : 'Email service error' });
        }

        res.status(201).json({
            message: 'Tickets issued successfully',
            ticketsCreated: createdTickets?.length || 0,
            emailsSent: emailResults.successful,
            emailsFailed: emailResults.failed,
            errors: emailResults.errors.length > 0 ? emailResults.errors : undefined
        });

    } catch (error) {
        console.error('Error issuing bulk tickets:', error);
        res.status(500).json({ error: 'Failed to issue tickets' });
    }
});

// Issue ticket to a single registration
ticketsRouter.post('/issue/:registrationId', authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        const { registrationId } = req.params;
        const userId = req.user?.id;
        const authSupabase = getAuthSupabase(req);

        // Get registration with event details
        const { data: registration, error: regError } = await authSupabase
            .from('event_registrations')
            .select(`
                *,
                events(*)
            `)
            .eq('id', registrationId)
            .single();

        if (regError || !registration) {
            return res.status(404).json({ error: 'Registration not found' });
        }

        const reg = registration as unknown as EventRegistration & { events: Event };

        // Verify user is the event organizer
        if (reg.events.organizer_id !== userId) {
            return res.status(403).json({ error: 'Unauthorized - Not the event organizer' });
        }

        // Check if registration is approved
        if (reg.status !== 'approved') {
            return res.status(400).json({ error: 'Cannot issue ticket - Registration is not approved' });
        }

        // Check if ticket already exists
        const { data: existingTicket } = await authSupabase
            .from('event_tickets' as any)
            .select('id')
            .eq('registration_id', registrationId)
            .single();

        if (existingTicket) {
            return res.status(400).json({ error: 'Ticket already issued for this registration' });
        }

        // Create ticket
        const qrToken = generateQRToken();
        const { data: ticket, error: ticketError } = await authSupabase
            .from('event_tickets' as any)
            .insert({
                registration_id: registrationId,
                event_id: reg.event_id,
                participant_email: reg.email,
                participant_name: reg.full_name,
                qr_code_data: qrToken,
                status: 'issued'
            })
            .select()
            .single();

        if (ticketError) {
            throw ticketError;
        }

        // Send email
        const emailResult = await sendTicketEmail({
            recipientEmail: reg.email,
            recipientName: reg.full_name,
            eventTitle: reg.events.title,
            eventDate: formatEventDate(reg.events.event_date),
            eventLocation: reg.events.location || 'TBA',
            qrCodeData: qrToken,
            ticketId: (ticket as unknown as Ticket).id
        });

        res.status(201).json({
            message: 'Ticket issued successfully',
            ticket,
            emailSent: emailResult.success,
            emailError: emailResult.error
        });

    } catch (error) {
        console.error('Error issuing single ticket:', error);
        res.status(500).json({ error: 'Failed to issue ticket' });
    }
});

// Get current user's tickets (for participants)
ticketsRouter.get('/my-tickets', authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        const userEmail = req.user?.email;
        const authSupabase = getAuthSupabase(req);

        if (!userEmail) {
            return res.status(400).json({ error: 'User email not found' });
        }

        const { data: tickets, error } = await authSupabase
            .from('event_tickets' as any)
            .select(`
                *,
                events(id, title, event_date, location, status)
            `)
            .eq('participant_email', userEmail)
            .order('created_at', { ascending: false });

        if (error) {
            throw error;
        }

        res.json(tickets || []);

    } catch (error) {
        console.error('Error fetching user tickets:', error);
        res.status(500).json({ error: 'Failed to fetch tickets' });
    }
});

// Get all tickets for an event (for organizers)
ticketsRouter.get('/event/:eventId', authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        const { eventId } = req.params;
        const userId = req.user?.id;
        const authSupabase = getAuthSupabase(req);

        // Verify user is the event organizer
        const { data: event, error: eventError } = await authSupabase
            .from('events')
            .select('organizer_id')
            .eq('id', eventId)
            .single();

        if (eventError || !event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        if ((event as unknown as { organizer_id: string }).organizer_id !== userId) {
            return res.status(403).json({ error: 'Unauthorized - Not the event organizer' });
        }

        const { data: tickets, error } = await authSupabase
            .from('event_tickets' as any)
            .select('*')
            .eq('event_id', eventId)
            .order('created_at', { ascending: false });

        if (error) {
            throw error;
        }

        // Get summary stats
        const ticketsList = (tickets || []) as unknown as Ticket[];
        const stats = {
            total: ticketsList.length,
            issued: ticketsList.filter(t => t.status === 'issued').length,
            used: ticketsList.filter(t => t.status === 'used').length,
            cancelled: ticketsList.filter(t => t.status === 'cancelled').length
        };

        res.json({ tickets: ticketsList, stats });

    } catch (error) {
        console.error('Error fetching event tickets:', error);
        res.status(500).json({ error: 'Failed to fetch tickets' });
    }
});

// Validate/scan QR code at event check-in
ticketsRouter.post('/validate', authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        const { qrCodeData, eventId } = req.body;
        const userId = req.user?.id;
        const authSupabase = getAuthSupabase(req);

        if (!qrCodeData) {
            return res.status(400).json({ error: 'QR code data is required' });
        }

        // Find ticket by QR code
        const { data: ticket, error: ticketError } = await authSupabase
            .from('event_tickets' as any)
            .select(`
                *,
                events(id, title, organizer_id)
            `)
            .eq('qr_code_data', qrCodeData)
            .single();

        if (ticketError || !ticket) {
            return res.status(404).json({
                valid: false,
                reason: 'not_found',
                message: 'Invalid ticket - QR code not recognized'
            });
        }

        const ticketData = ticket as unknown as Ticket & { events: Event };

        // Verify user is the event organizer
        if (ticketData.events.organizer_id !== userId) {
            return res.status(403).json({ error: 'Unauthorized - Not the event organizer' });
        }

        // Check if eventId matches (if provided)
        if (eventId && ticketData.event_id !== eventId) {
            return res.status(400).json({
                valid: false,
                reason: 'wrong_event',
                message: 'This ticket is for a different event'
            });
        }

        // Check if ticket is cancelled
        if (ticketData.status === 'cancelled') {
            return res.status(400).json({
                valid: false,
                reason: 'cancelled',
                message: 'This ticket has been cancelled'
            });
        }

        // Check if already used
        if (ticketData.status === 'used' || ticketData.qr_used_at) {
            return res.status(400).json({
                valid: false,
                reason: 'already_used',
                message: 'This ticket has already been used',
                usedAt: ticketData.qr_used_at,
                participant: {
                    name: ticketData.participant_name,
                    email: ticketData.participant_email
                }
            });
        }

        // Mark ticket as used
        const { error: updateError } = await authSupabase
            .from('event_tickets' as any)
            .update({
                status: 'used',
                qr_used_at: new Date().toISOString()
            })
            .eq('id', ticketData.id);

        if (updateError) {
            throw updateError;
        }

        res.json({
            valid: true,
            message: 'Ticket validated successfully',
            participant: {
                name: ticketData.participant_name,
                email: ticketData.participant_email
            },
            event: {
                id: ticketData.events.id,
                title: ticketData.events.title
            },
            checkedInAt: new Date().toISOString()
        });

    } catch (error) {
        console.error('Error validating ticket:', error);
        res.status(500).json({ error: 'Failed to validate ticket' });
    }
});

// Cancel a ticket
ticketsRouter.patch('/cancel/:ticketId', authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        const { ticketId } = req.params;
        const userId = req.user?.id;
        const authSupabase = getAuthSupabase(req);

        // Get ticket with event info
        const { data: ticket, error: ticketError } = await authSupabase
            .from('event_tickets' as any)
            .select(`
                *,
                events(organizer_id)
            `)
            .eq('id', ticketId)
            .single();

        if (ticketError || !ticket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }

        const ticketData = ticket as unknown as Ticket & { events: { organizer_id: string } };

        // Verify user is the event organizer
        if (ticketData.events.organizer_id !== userId) {
            return res.status(403).json({ error: 'Unauthorized - Not the event organizer' });
        }

        // Update ticket status
        const { error: updateError } = await authSupabase
            .from('event_tickets' as any)
            .update({ status: 'cancelled' })
            .eq('id', ticketId);

        if (updateError) {
            throw updateError;
        }

        res.json({ message: 'Ticket cancelled successfully' });

    } catch (error) {
        console.error('Error cancelling ticket:', error);
        res.status(500).json({ error: 'Failed to cancel ticket' });
    }
});
