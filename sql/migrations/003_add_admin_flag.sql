-- Add is_admin flag to users table for admin authorization
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS is_admin boolean DEFAULT false;
