-- Add OAuth columns to users table if they don't exist
ALTER TABLE users ADD COLUMN IF NOT EXISTS google_id TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS profile_image TEXT;

-- Create index for OAuth lookups if it doesn't exist
CREATE INDEX IF NOT EXISTS idx_users_google_id ON users(google_id);