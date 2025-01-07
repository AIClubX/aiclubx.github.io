-- Create event_registrations table
CREATE TABLE IF NOT EXISTS event_registrations (
  id TEXT PRIMARY KEY,
  event_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  registration_date TEXT NOT NULL DEFAULT (datetime('now')),
  notes TEXT,
  dietary_requirements TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (event_id) REFERENCES events (id),
  FOREIGN KEY (user_id) REFERENCES users (id)
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_event_registrations_event_id ON event_registrations(event_id);
CREATE INDEX IF NOT EXISTS idx_event_registrations_user_id ON event_registrations(user_id);

-- Create trigger for updating timestamps
CREATE TRIGGER IF NOT EXISTS update_event_registrations_timestamp 
AFTER UPDATE ON event_registrations
BEGIN
  UPDATE event_registrations SET updated_at = datetime('now') WHERE id = NEW.id;
END;