# Supabase Setup Guide

This guide will help you set up a new Supabase project for the EventFlow application.

## Step 1: Create a New Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project" or "New Project"
3. Enter your project details:
   - Project name: EventFlow
   - Database password: Set a strong password and save it somewhere secure
   - Region: Choose the region closest to your users
4. Click "Create new project"

## Step 2: Get Your API Credentials

After your project is created:

1. Go to Project Settings > API
2. Copy the following values:
   - Project URL (This is your `VITE_SUPABASE_URL`)
   - Project API Key (anon, public) (This is your `VITE_SUPABASE_ANON_KEY`)

## Step 3: Configure Environment Variables

Update your `.env` file with the credentials from Supabase:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_actual_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_actual_supabase_anon_key

# Google OAuth Configuration
VITE_GOOGLE_OAUTH_CLIENT_ID=your_google_oauth_client_id
VITE_GOOGLE_OAUTH_CLIENT_SECRET=your_google_oauth_client_secret
```

## Step 4: Set Up Database Schema

Run the SQL migration to create the necessary tables:

1. Go to the SQL Editor in your Supabase dashboard
2. Create a new query and paste the contents of `supabase/migrations/20250610191138-286ba8b7-208c-475e-94aa-108e97247a69.sql`
3. Run the query

## Step 5: Configure Authentication

1. Go to Authentication > Providers
2. Enable Email authentication
3. Enable Google authentication and configure with your Google OAuth credentials

## Step 6: Set Up Row Level Security (RLS)

The migration file already includes RLS policies. Make sure they are enabled:

1. Go to Table Editor
2. For each table, ensure RLS is turned on

## Step 7: Configure Redirect URLs for OAuth

In your Supabase Authentication settings, add the following redirect URLs:
- http://localhost:5173/** (for local development)
- Your production URLs when ready

## Google OAuth Setup

To set up Google OAuth:

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Create OAuth 2.0 credentials (Web application)
5. Add authorized redirect URIs:
   - http://localhost:5173/** (for local development)
6. Copy the Client ID and Client Secret to your `.env` file

## Running the Application

After setting up the environment variables:

```bash
npm install
npm run dev
```

The application should now connect to your new Supabase backend!