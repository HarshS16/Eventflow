import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from server/.env FIRST before other imports
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Now import other modules that depend on env vars
import express from 'express';
import cors from 'cors';
import { eventsRouter } from './routes/events.js';
import { profilesRouter } from './routes/profiles.js';
import { authRouter } from './routes/auth.js';
import { sponsorshipsRouter } from './routes/sponsorships.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:8080',
  credentials: true
}));
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Eventflow API Server',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      events: '/api/events',
      profiles: '/api/profiles',
      auth: '/api/auth',
      sponsorships: '/api/sponsorships'
    }
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/events', eventsRouter);
app.use('/api/profiles', profilesRouter);
app.use('/api/auth', authRouter);
app.use('/api/sponsorships', sponsorshipsRouter);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api`);
});

export default app;
