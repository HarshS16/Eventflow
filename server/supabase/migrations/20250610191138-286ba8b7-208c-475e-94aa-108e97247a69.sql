
-- Create a table for event registrations
CREATE TABLE public.event_registrations (
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

-- Add Row Level Security (RLS) to the registrations table
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;

-- Create policy that allows anyone to INSERT registrations (public registration)
CREATE POLICY "Anyone can register for events" 
  ON public.event_registrations 
  FOR INSERT 
  WITH CHECK (true);

-- Create policy that allows event organizers to view registrations for their events
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

-- Create policy that allows event organizers to update registrations for their events
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

-- Add RLS policy to events table to allow public viewing of published events
CREATE POLICY "Anyone can view published events" 
  ON public.events 
  FOR SELECT 
  USING (status = 'published');

-- Create policy that allows organizers to view their own events
CREATE POLICY "Organizers can view their own events" 
  ON public.events 
  FOR SELECT 
  USING (organizer_id = auth.uid());

-- Create policies for organizers to manage their events
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
