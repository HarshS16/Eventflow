-- ====================
-- FIX EXISTING PROFILES DATA
-- ====================
-- This script is for fixing existing data where users have signed up but don't have profiles
-- Run this script if you get foreign key constraint errors when creating events

-- First, let's see if there are users without profiles
SELECT u.id, u.email 
FROM auth.users u
LEFT JOIN public.profiles p ON u.id = p.id
WHERE p.id IS NULL;

-- Create profiles for any users that don't have them
-- This will create basic profiles for existing users
INSERT INTO public.profiles (id, email, full_name, user_type)
SELECT u.id, u.email, '', 'community'
FROM auth.users u
LEFT JOIN public.profiles p ON u.id = p.id
WHERE p.id IS NULL;

-- Update any existing profiles that might be missing required fields
UPDATE public.profiles 
SET 
  email = COALESCE(email, (SELECT email FROM auth.users WHERE id = profiles.id)),
  full_name = COALESCE(full_name, ''),
  user_type = COALESCE(user_type, 'community')
WHERE 
  email IS NULL 
  OR full_name IS NULL 
  OR user_type IS NULL;