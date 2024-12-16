CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  hashed_password TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'REGULAR',
  university TEXT,
  company TEXT,
  title TEXT,
  chapter_id TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (chapter_id) REFERENCES chapters (id)
);

CREATE TABLE chapters (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  university TEXT NOT NULL,
  location TEXT NOT NULL,
  member_count INTEGER DEFAULT 0,
  lead_email TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE events (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  date DATETIME NOT NULL,
  location TEXT NOT NULL,
  description TEXT NOT NULL,
  type TEXT NOT NULL,
  chapter_id TEXT NOT NULL,
  organizer_id TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (chapter_id) REFERENCES chapters (id),
  FOREIGN KEY (organizer_id) REFERENCES users (id)
);

CREATE TABLE resources (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  type TEXT NOT NULL,
  link TEXT NOT NULL,
  company TEXT,
  deadline DATETIME,
  author_id TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES users (id)
);

CREATE TRIGGER update_users_timestamp 
AFTER UPDATE ON users
BEGIN
  UPDATE users SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER update_chapters_timestamp
AFTER UPDATE ON chapters
BEGIN
  UPDATE chapters SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER update_events_timestamp
AFTER UPDATE ON events
BEGIN
  UPDATE events SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER update_resources_timestamp
AFTER UPDATE ON resources
BEGIN
  UPDATE resources SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;