# 🎉 EventFlow

> **EventFlow** is a full-stack, end-to-end event management web app that simplifies event organization by automating promotion, ticketing, communication, and participant handling — all in one platform.

---

## 🚀 Features

- 🎟️ **QR-Based Ticketing System**  
  Automatic QR code generation on registration and real-time scanning at the event venue.

- 🧑‍💼 **Sponsor & Community Onboarding**  
  Connect with relevant sponsors and leverage communities to promote your events.

- 🛠️ **Organizer Admin Panel**  
  Dashboard to create events, manage guests and participants, and broadcast event updates.

- 🔔 **Notification System**  
  Email and SMS notifications to attendees for announcements, updates, or schedule changes.

- 🔐 **Google OAuth Login**  
  Easy sign-in with Google for attendees, sponsors, and organizers.

---

## 🧱 Tech Stack

| Layer       | Tech                                                         |
|-------------|--------------------------------------------------------------|
| Frontend    | React.js, Vite, Tailwind CSS, HTML, Zustand (state)         |
| Backend     | Node.js, Express.js                                          |
| Database    | PostgreSQL with Prisma ORM                                  |
| Auth        | Google OAuth (via Passport.js or Firebase Auth)             |
| QR Handling | `qrcode` (backend), `html5-qrcode` (frontend scanner)       |
| Notifications | Nodemailer, OneSignal/Twilio (for email/SMS)              |
| Deployment  | Vercel (Frontend), Render/Railway (Backend), Supabase (DB)  |

---

## 🛠️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/eventflow.git
cd eventflow
