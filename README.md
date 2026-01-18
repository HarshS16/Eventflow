# Eventflow

A complete platform connecting event organizers, sponsors, and communities for seamless event management and meaningful partnerships.

## 📁 Project Structure

This project uses a **monorepo** structure with npm workspaces:

```
Eventflow/
├── client/                 # React frontend (Vite + TypeScript)
│   ├── src/
│   │   ├── api/            # API client for backend communication
│   │   ├── components/     # React components
│   │   ├── pages/          # Route pages
│   │   ├── contexts/       # React contexts (Auth, etc.)
│   │   ├── hooks/          # Custom hooks
│   │   └── integrations/   # Third-party integrations (Supabase)
│   ├── public/             # Static assets
│   └── package.json        # Frontend dependencies
│
├── server/                 # Express.js backend (TypeScript)
│   ├── src/
│   │   ├── routes/         # API route handlers
│   │   ├── services/       # Business logic
│   │   ├── middleware/     # Auth middleware, etc.
│   │   └── db/             # Database client (Supabase)
│   ├── supabase/           # Database migrations
│   └── package.json        # Backend dependencies
│
├── shared/                 # Shared types and utilities
│   └── types/              # Database types
│
└── package.json            # Root workspace configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm 9+
- Supabase account (for database)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Eventflow
   ```

2. Install all dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:

   **Client** (`client/.env`):
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_API_URL=http://localhost:3001/api
   ```

   **Server** (`server/.env`):
   ```env
   PORT=3001
   CLIENT_URL=http://localhost:8080
   SUPABASE_URL=your_supabase_url
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```

### Running the Application

**Development (both client and server):**
```bash
npm run dev
```

**Run client only:**
```bash
npm run dev:client
```

**Run server only:**
```bash
npm run dev:server
```

### Building for Production

```bash
npm run build
```

## 🏗️ Architecture

### Frontend (Client)
- **React 18** with TypeScript
- **Vite** for fast development and building
- **TailwindCSS** for styling
- **React Query** for data fetching
- **React Router** for navigation
- **Framer Motion** for animations

### Backend (Server)
- **Express.js** with TypeScript
- **Supabase** for database and authentication
- RESTful API design
- JWT authentication via Supabase

### API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Health check |
| `/api/events` | GET | List all events |
| `/api/events/:id` | GET | Get single event |
| `/api/events` | POST | Create event (auth) |
| `/api/profiles/:id` | GET | Get profile (auth) |
| `/api/sponsorships` | GET | List sponsorships |

## 👥 User Roles

- **Organizer**: Create and manage events
- **Sponsor**: Browse and sponsor events
- **Community**: Community organizations
- **Participant**: Event attendees

## 📝 License

MIT License - see [LICENSE](LICENSE) for details.
