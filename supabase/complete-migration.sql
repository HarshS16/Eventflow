-- ====================
-- PROFILES TABLE
-- ====================
-- Create profiles table
-- Note: We're using CREATE TABLE IF NOT EXISTS to avoid errors if the table already exists
-- If you need to recreate the table, uncomment the following line (WARNING: This will delete all existing profile data!)
-- DROP TABLE IF EXISTS public.profiles;
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  email TEXT,
  company_name TEXT,
  bio TEXT,
  website TEXT,
  avatar_url TEXT,
  user_type TEXT CHECK (user_type IN ('community', 'organizer', 'sponsor')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- ====================
-- EVENTS TABLE
-- ====================
-- Create events table
CREATE TABLE IF NOT EXISTS public.events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  event_date TIMESTAMP WITH TIME ZONE,
  location TEXT,
  organizer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  max_attendees INTEGER,
  ticket_price NUMERIC,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- ====================
-- EVENT REGISTRATIONS TABLE
-- ====================
-- Create event_registrations table
CREATE TABLE IF NOT EXISTS public.event_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  message TEXT,
  status TEXT DEFAULT 'waitlist' CHECK (status IN ('waitlist', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- ====================
-- SPONSORSHIP OPPORTUNITIES TABLE
-- ====================
-- Create sponsorship_opportunities table
CREATE TABLE IF NOT EXISTS public.sponsorship_opportunities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  budget_min NUMERIC,
  budget_max NUMERIC,
  benefits TEXT[],
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'closed', 'fulfilled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- ====================
-- ENABLE ROW LEVEL SECURITY
-- ====================
-- Enable Row Level Security (RLS) on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sponsorship_opportunities ENABLE ROW LEVEL SECURITY;

-- ====================
-- DROP EXISTING POLICIES
-- ====================
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Anyone can view published events" ON public.events;
DROP POLICY IF EXISTS "Organizers can view their own events" ON public.events;
DROP POLICY IF EXISTS "Organizers can insert their own events" ON public.events;
DROP POLICY IF EXISTS "Organizers can update their own events" ON public.events;
DROP POLICY IF EXISTS "Organizers can delete their own events" ON public.events;
DROP POLICY IF EXISTS "Anyone can register for events" ON public.event_registrations;
DROP POLICY IF EXISTS "Organizers can view registrations for their events" ON public.event_registrations;
DROP POLICY IF EXISTS "Organizers can update registrations for their events" ON public.event_registrations;
DROP POLICY IF EXISTS "Anyone can view open sponsorship opportunities" ON public.sponsorship_opportunities;
DROP POLICY IF EXISTS "Organizers can manage sponsorship opportunities for their events" ON public.sponsorship_opportunities;

-- ====================
-- PROFILES POLICIES
-- ====================
-- Profiles policies
CREATE POLICY "Users can view their own profile" 
  ON public.profiles 
  FOR SELECT 
  USING (id = auth.uid());

CREATE POLICY "Users can update their own profile" 
  ON public.profiles 
  FOR UPDATE 
  USING (id = auth.uid());

-- ====================
-- EVENTS POLICIES
-- ====================
-- Events policies
DROP POLICY IF EXISTS "Anyone can view published events" ON public.events;
DROP POLICY IF EXISTS "Organizers can view their own events" ON public.events;
DROP POLICY IF EXISTS "Organizers can insert their own events" ON public.events;
DROP POLICY IF EXISTS "Organizers can update their own events" ON public.events;
DROP POLICY IF EXISTS "Organizers can delete their own events" ON public.events;

CREATE POLICY "Anyone can view published events" 
  ON public.events 
  FOR SELECT 
  USING (status = 'published');

CREATE POLICY "Organizers can view their own events" 
  ON public.events 
  FOR SELECT 
  USING (organizer_id = auth.uid());

CREATE POLICY "Organizers can insert their own events" 
  ON public.events 
  FOR INSERT 
  WITH CHECK (organizer_id = auth.uid());

CREATE POLICY "Organizers can update their own events" 
  ON public.events 
  FOR UPDATE 
  USING (organizer_id = auth.uid());

CREATE POLICY "Organizers can delete their own events" 
  ON public.events 
  FOR DELETE 
  USING (organizer_id = auth.uid());

-- ====================
-- EVENT REGISTRATIONS POLICIES
-- ====================
-- Event registrations policies
DROP POLICY IF EXISTS "Anyone can register for events" ON public.event_registrations;
DROP POLICY IF EXISTS "Organizers can view registrations for their events" ON public.event_registrations;
DROP POLICY IF EXISTS "Organizers can update registrations for their events" ON public.event_registrations;

CREATE POLICY "Anyone can register for events" 
  ON public.event_registrations 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Organizers can view registrations for their events" 
  ON public.event_registrations 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.events 
      WHERE events.id = event_registrations.event_id 
      AND events.organizer_id = auth.uid()
    )
  );

CREATE POLICY "Organizers can update registrations for their events" 
  ON public.event_registrations 
  FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM public.events 
      WHERE events.id = event_registrations.event_id 
      AND events.organizer_id = auth.uid()
    )
  );

-- ====================
-- SPONSORSHIP OPPORTUNITIES POLICIES
-- ====================
-- Sponsorship opportunities policies
DROP POLICY IF EXISTS "Anyone can view open sponsorship opportunities" ON public.sponsorship_opportunities;
DROP POLICY IF EXISTS "Organizers can manage sponsorship opportunities for their events" ON public.sponsorship_opportunities;

CREATE POLICY "Anyone can view open sponsorship opportunities" 
  ON public.sponsorship_opportunities 
  FOR SELECT 
  USING (status = 'open');

CREATE POLICY "Organizers can manage sponsorship opportunities for their events" 
  ON public.sponsorship_opportunities 
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.events 
      WHERE events.id = sponsorship_opportunities.event_id 
      AND events.organizer_id = auth.uid()
    )
  );

-- ====================
-- AUTOMATIC PROFILE CREATION TRIGGER FUNCTION
-- ====================
-- Create a function to automatically create a profile when a new user signs up
DROP FUNCTION IF EXISTS public.handle_new_user();
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, user_type)
  VALUES (
    NEW.id, 
    NEW.email, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'user_type', 'community')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ====================
-- TRIGGER FOR AUTOMATIC PROFILE CREATION
-- ====================
-- Create a trigger to call the function when a new user is created
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();