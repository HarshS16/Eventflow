import { Router, Request, Response } from 'express';
import { supabase } from '../db/supabase.js';
import { authMiddleware, AuthRequest } from '../middleware/authMiddleware.js';

export const sponsorshipsRouter = Router();

// Get all sponsorship opportunities (public)
sponsorshipsRouter.get('/', async (req: Request, res: Response) => {
    try {
        const { data, error } = await supabase
            .from('sponsorship_opportunities')
            .select('*')
            .eq('status', 'open')
            .order('created_at', { ascending: false });

        if (error) throw error;
        res.json(data);
    } catch (error) {
        console.error('Error fetching sponsorships:', error);
        res.status(500).json({ error: 'Failed to fetch sponsorships' });
    }
});

// Get sponsorship by ID (public)
sponsorshipsRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase
            .from('sponsorship_opportunities')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        if (!data) {
            return res.status(404).json({ error: 'Sponsorship not found' });
        }
        res.json(data);
    } catch (error) {
        console.error('Error fetching sponsorship:', error);
        res.status(500).json({ error: 'Failed to fetch sponsorship' });
    }
});

// Create sponsorship opportunity (protected - organizers only)
sponsorshipsRouter.post('/', authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        const { event_id, ...sponsorshipData } = req.body;

        // Verify the user owns the event
        const { data: event } = await supabase
            .from('events')
            .select('organizer_id')
            .eq('id', event_id)
            .single();

        const eventData = event as { organizer_id: string } | null;
        if (eventData?.organizer_id !== req.user?.id) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        const { data, error } = await supabase
            .from('sponsorship_opportunities')
            .insert({
                ...sponsorshipData,
                event_id
            })
            .select()
            .single();

        if (error) throw error;
        res.status(201).json(data);
    } catch (error) {
        console.error('Error creating sponsorship:', error);
        res.status(500).json({ error: 'Failed to create sponsorship' });
    }
});

// Update sponsorship (protected)
sponsorshipsRouter.put('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;

        // Get the sponsorship and verify ownership through event
        const { data: sponsorship } = await supabase
            .from('sponsorship_opportunities')
            .select('event_id')
            .eq('id', id)
            .single();

        const sponsorshipData = sponsorship as { event_id: string } | null;
        if (sponsorshipData?.event_id) {
            const { data: event } = await supabase
                .from('events')
                .select('organizer_id')
                .eq('id', sponsorshipData.event_id)
                .single();

            const eventData = event as { organizer_id: string } | null;
            if (eventData?.organizer_id !== req.user?.id) {
                return res.status(403).json({ error: 'Unauthorized' });
            }
        }

        const { data, error } = await supabase
            .from('sponsorship_opportunities')
            .update(req.body)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        res.json(data);
    } catch (error) {
        console.error('Error updating sponsorship:', error);
        res.status(500).json({ error: 'Failed to update sponsorship' });
    }
});
