-- Migration: Add user_roles table for multi-role support
-- Created: 2026-01-18

-- Create the user_roles table
CREATE TABLE IF NOT EXISTS user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('organizer', 'sponsor', 'community', 'participant')),
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, role)
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_role ON user_roles(role);

-- Enable RLS
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Users can view their own roles
CREATE POLICY "Users can view own roles" ON user_roles
    FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own roles
CREATE POLICY "Users can insert own roles" ON user_roles
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own roles
CREATE POLICY "Users can update own roles" ON user_roles
    FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own roles
CREATE POLICY "Users can delete own roles" ON user_roles
    FOR DELETE USING (auth.uid() = user_id);

-- Migrate existing user_type data to user_roles table
INSERT INTO user_roles (user_id, role, is_primary)
SELECT id, user_type, true
FROM profiles
WHERE user_type IS NOT NULL
  AND user_type IN ('organizer', 'sponsor', 'community', 'participant')
ON CONFLICT (user_id, role) DO NOTHING;

-- Add comment for documentation
COMMENT ON TABLE user_roles IS 'Stores user roles for multi-role support. Each user can have multiple roles.';
