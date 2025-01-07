-- Create migrations table
CREATE TABLE IF NOT EXISTS migrations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  executed_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  hashed_password TEXT,
  role TEXT NOT NULL DEFAULT 'regular',
  university TEXT,
  company TEXT,
  title TEXT,
  google_id TEXT,
  profile_image TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Create chapters table
CREATE TABLE IF NOT EXISTS chapters (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  university TEXT NOT NULL,
  location TEXT NOT NULL,
  member_count INTEGER DEFAULT 0,
  lead_email TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  location TEXT NOT NULL,
  description TEXT NOT NULL,
  type TEXT NOT NULL,
  chapter_id TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (chapter_id) REFERENCES chapters (id)
);

-- Create resources table
CREATE TABLE IF NOT EXISTS resources (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  type TEXT NOT NULL,
  link TEXT NOT NULL,
  company TEXT,
  deadline TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

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

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_google_id ON users(google_id);
CREATE INDEX IF NOT EXISTS idx_event_registrations_event_id ON event_registrations(event_id);
CREATE INDEX IF NOT EXISTS idx_event_registrations_user_id ON event_registrations(user_id);

-- Create triggers for updating timestamps
CREATE TRIGGER IF NOT EXISTS update_users_timestamp 
AFTER UPDATE ON users
BEGIN
  UPDATE users SET updated_at = datetime('now') WHERE id = NEW.id;
END;

CREATE TRIGGER IF NOT EXISTS update_chapters_timestamp
AFTER UPDATE ON chapters
BEGIN
  UPDATE chapters SET updated_at = datetime('now') WHERE id = NEW.id;
END;

CREATE TRIGGER IF NOT EXISTS update_events_timestamp
AFTER UPDATE ON events
BEGIN
  UPDATE events SET updated_at = datetime('now') WHERE id = NEW.id;
END;

CREATE TRIGGER IF NOT EXISTS update_resources_timestamp
AFTER UPDATE ON resources
BEGIN
  UPDATE resources SET updated_at = datetime('now') WHERE id = NEW.id;
END;

CREATE TRIGGER IF NOT EXISTS update_event_registrations_timestamp 
AFTER UPDATE ON event_registrations
BEGIN
  UPDATE event_registrations SET updated_at = datetime('now') WHERE id = NEW.id;
END;