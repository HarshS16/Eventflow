-- ====================
-- EVENT TICKETS TABLE
-- ====================
-- Table to store QR tickets for event registrations
CREATE TABLE IF NOT EXISTS public.event_tickets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  registration_id UUID REFERENCES public.event_registrations(id) ON DELETE CASCADE NOT NULL,
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE NOT NULL,
  participant_email TEXT NOT NULL,
  participant_name TEXT NOT NULL,
  qr_code_data TEXT NOT NULL UNIQUE,    -- Unique token for QR validation
  qr_issued_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  qr_used_at TIMESTAMP WITH TIME ZONE,  -- Track when ticket is scanned/used
  status TEXT DEFAULT 'issued' CHECK (status IN ('issued', 'used', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_event_tickets_event_id ON public.event_tickets(event_id);
CREATE INDEX IF NOT EXISTS idx_event_tickets_registration_id ON public.event_tickets(registration_id);
CREATE INDEX IF NOT EXISTS idx_event_tickets_participant_email ON public.event_tickets(participant_email);
CREATE INDEX IF NOT EXISTS idx_event_tickets_qr_code_data ON public.event_tickets(qr_code_data);

-- ====================
-- ENABLE ROW LEVEL SECURITY
-- ====================
ALTER TABLE public.event_tickets ENABLE ROW LEVEL SECURITY;

-- ====================
-- DROP EXISTING POLICIES (if any)
-- ====================
DROP POLICY IF EXISTS "Participants can view their own tickets" ON public.event_tickets;
DROP POLICY IF EXISTS "Organizers can view tickets for their events" ON public.event_tickets;
DROP POLICY IF EXISTS "Organizers can insert tickets for their events" ON public.event_tickets;
DROP POLICY IF EXISTS "Organizers can update tickets for their events" ON public.event_tickets;

-- ====================
-- EVENT TICKETS POLICIES
-- ====================

-- Participants can view their own tickets
CREATE POLICY "Participants can view their own tickets"
  ON public.event_tickets
  FOR SELECT
  USING (
    participant_email = (SELECT email FROM auth.users WHERE id = auth.uid())
  );

-- Organizers can view tickets for their events
CREATE POLICY "Organizers can view tickets for their events"
  ON public.event_tickets
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.events
      WHERE events.id = event_tickets.event_id
      AND events.organizer_id = auth.uid()
    )
  );

-- Organizers can insert tickets for their events
CREATE POLICY "Organizers can insert tickets for their events"
  ON public.event_tickets
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.events
      WHERE events.id = event_tickets.event_id
      AND events.organizer_id = auth.uid()
    )
  );

-- Organizers can update tickets for their events (for validation/check-in)
CREATE POLICY "Organizers can update tickets for their events"
  ON public.event_tickets
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.events
      WHERE events.id = event_tickets.event_id
      AND events.organizer_id = auth.uid()
    )
  );

-- ====================
-- TRIGGER FOR UPDATED_AT
-- ====================
CREATE OR REPLACE FUNCTION update_event_tickets_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_event_tickets_updated_at ON public.event_tickets;
CREATE TRIGGER trigger_event_tickets_updated_at
  BEFORE UPDATE ON public.event_tickets
  FOR EACH ROW
  EXECUTE FUNCTION update_event_tickets_updated_at();
