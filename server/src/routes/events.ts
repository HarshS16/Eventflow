import { Router, Request, Response } from 'express';
import { supabase } from '../db/supabase.js';
import { authMiddleware, AuthRequest } from '../middleware/authMiddleware.js';

export const eventsRouter = Router();

// Get all events (public)
eventsRouter.get('/', async (req: Request, res: Response) => {
    try {
        const { data, error } = await supabase
            .from('events')
            .select('*')
            .eq('status', 'published')
            .order('event_date', { ascending: true });

        if (error) throw error;
        res.json(data);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'Failed to fetch events' });
    }
});

// Get single event by ID (public)
eventsRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase
            .from('events')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        if (!data) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.json(data);
    } catch (error) {
        console.error('Error fetching event:', error);
        res.status(500).json({ error: 'Failed to fetch event' });
    }
});

// Get events by organizer (protected)
eventsRouter.get('/organizer/:organizerId', authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        const { organizerId } = req.params;

        // Verify the user is requesting their own events
        if (req.user?.id !== organizerId) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        const { data, error } = await supabase
            .from('events')
            .select('*')
            .eq('organizer_id', organizerId)
            .order('created_at', { ascending: false });

        if (error) throw error;
        res.json(data);
    } catch (error) {
        console.error('Error fetching organizer events:', error);
        res.status(500).json({ error: 'Failed to fetch events' });
    }
});

// Create event (protected)
eventsRouter.post('/', authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        const eventData = {
            ...req.body,
            organizer_id: req.user?.id
        };

        const { data, error } = await supabase
            .from('events')
            .insert(eventData)
            .select()
            .single();

        if (error) throw error;
        res.status(201).json(data);
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ error: 'Failed to create event' });
    }
});

// Update event (protected)
eventsRouter.put('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;

        // Verify ownership
        const { data: existing } = await supabase
            .from('events')
            .select('organizer_id')
            .eq('id', id)
            .single();

        const existingEvent = existing as { organizer_id: string } | null;
        if (existingEvent?.organizer_id !== req.user?.id) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        const { data, error } = await supabase
            .from('events')
            .update(req.body)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        res.json(data);
    } catch (error) {
        console.error('Error updating event:', error);
        res.status(500).json({ error: 'Failed to update event' });
    }
});

// Delete event (protected)
eventsRouter.delete('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;

        // Verify ownership
        const { data: existing } = await supabase
            .from('events')
            .select('organizer_id')
            .eq('id', id)
            .single();

        const existingEvent = existing as { organizer_id: string } | null;
        if (existingEvent?.organizer_id !== req.user?.id) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        const { error } = await supabase
            .from('events')
            .delete()
            .eq('id', id);

        if (error) throw error;
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).json({ error: 'Failed to delete event' });
    }
});
