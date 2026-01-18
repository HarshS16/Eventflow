import { Router, Request, Response } from 'express';
import { supabase } from '../db/supabase.js';

export const authRouter = Router();

// Verify token endpoint - validates JWT and returns user info
authRouter.post('/verify', async (req: Request, res: Response) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'No token provided' });
        }

        const token = authHeader.substring(7);

        const { data: { user }, error } = await supabase.auth.getUser(token);

        if (error || !user) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        res.json({ user });
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(500).json({ error: 'Failed to verify token' });
    }
});

// Note: Actual signup/login is handled by Supabase client on frontend
// This server just validates tokens for protected API routes
