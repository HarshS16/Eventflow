---

# 🎉 EventFlow

> **EventFlow** is a full-stack, end-to-end event management web app that simplifies event organization by automating promotion, ticketing, communication, and participant handling — all in one platform.

---

## 🚀 Features

* 🎟️ **QR-Based Ticketing System**
  Automatic QR code generation on registration and real-time scanning at the event venue.

* 🧑‍💼 **Sponsor & Community Onboarding**
  Connect with relevant sponsors and leverage communities to promote your events.

* 🛠️ **Organizer Admin Panel**
  Dashboard to create events, manage guests and participants, and broadcast event updates.

* 🔔 **Notification System**
  Email and SMS notifications to attendees for announcements, updates, or schedule changes.

* 🔐 **Google OAuth Login**
  Easy sign-in with Google for attendees, sponsors, and organizers.

---

## 🧱 Tech Stack

| Layer         | Tech                                                       |
| ------------- | ---------------------------------------------------------- |
| Frontend      | React.js, Vite, Tailwind CSS, HTML, Zustand (state)        |
| Backend       | Node.js, Express.js                                        |
| Database      | PostgreSQL with Prisma ORM                                 |
| Auth          | Google OAuth (via Passport.js or Firebase Auth)            |
| QR Handling   | `qrcode` (backend), `html5-qrcode` (frontend scanner)      |
| Notifications | Nodemailer, OneSignal/Twilio (for email/SMS)               |
| Deployment    | Vercel (Frontend), Render/Railway (Backend), Supabase (DB) |

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/eventflow.git
cd eventflow
```

### 2. Install Dependencies

#### Frontend

```bash
cd frontend
npm install
```

#### Backend

```bash
cd ../backend
npm install
```

### 3. Environment Variables

Create a `.env` file in the `backend` folder:

```
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
DATABASE_URL=your_postgres_db_url
SESSION_SECRET=random_string
```

### 4. Run the App Locally

#### Backend

```bash
cd backend
npm run dev
```

#### Frontend

```bash
cd ../frontend
npm run dev
```

Visit: `http://localhost:3000`

---

## 📸 Screenshots

> *Coming Soon: Add UI mockups of the dashboard, login page, and QR system.*

---

## 🔒 Security & Best Practices

* Role-based access control for organizers, sponsors, and attendees.
* QR codes use UUIDs and are verified securely to prevent tampering.
* Token/session-based login protected with OAuth.

---

## ✨ Future Enhancements

* AI-based sponsor recommendation engine
* Mobile app (React Native)
* Payment gateway integration for ticket sales
* Gamified community promotion leaderboard

---

## 🧑‍💻 Author

Built with 💡 by **Harsh Srivastava**

> For collaborations, reach out at: `your_email@example.com`

---

## 📄 License

MIT License © 2025 EventFlow

---
