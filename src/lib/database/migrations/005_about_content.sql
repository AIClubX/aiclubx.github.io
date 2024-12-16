-- Create core_values table
CREATE TABLE IF NOT EXISTS core_values (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Create advisors table
CREATE TABLE IF NOT EXISTS advisors (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  organization TEXT NOT NULL,
  bio TEXT NOT NULL,
  image TEXT NOT NULL,
  linkedin TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Create sponsors table
CREATE TABLE IF NOT EXISTS sponsors (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  logo TEXT NOT NULL,
  website TEXT NOT NULL,
  description TEXT NOT NULL,
  tier TEXT NOT NULL CHECK(tier IN ('platinum', 'gold', 'silver', 'bronze')),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Create success_stories table
CREATE TABLE IF NOT EXISTS success_stories (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT,
  date TEXT NOT NULL,
  category TEXT NOT NULL CHECK(category IN ('member', 'chapter', 'project', 'event')),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Create about_content table for general content
CREATE TABLE IF NOT EXISTS about_content (
  id TEXT PRIMARY KEY DEFAULT 'main',
  hero_tagline TEXT NOT NULL,
  hero_mission TEXT NOT NULL,
  hero_background_image TEXT NOT NULL,
  vision_statement TEXT NOT NULL,
  vision_description TEXT NOT NULL,
  mission_statement TEXT NOT NULL,
  mission_description TEXT NOT NULL,
  who_we_are_title TEXT NOT NULL,
  who_we_are_content TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Create membership_benefits table
CREATE TABLE IF NOT EXISTS membership_benefits (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Create club_guidelines table
CREATE TABLE IF NOT EXISTS club_guidelines (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Create triggers for updating timestamps
CREATE TRIGGER IF NOT EXISTS update_core_values_timestamp 
AFTER UPDATE ON core_values
BEGIN
  UPDATE core_values SET updated_at = datetime('now') WHERE id = NEW.id;
END;

CREATE TRIGGER IF NOT EXISTS update_advisors_timestamp 
AFTER UPDATE ON advisors
BEGIN
  UPDATE advisors SET updated_at = datetime('now') WHERE id = NEW.id;
END;

CREATE TRIGGER IF NOT EXISTS update_sponsors_timestamp 
AFTER UPDATE ON sponsors
BEGIN
  UPDATE sponsors SET updated_at = datetime('now') WHERE id = NEW.id;
END;

CREATE TRIGGER IF NOT EXISTS update_success_stories_timestamp 
AFTER UPDATE ON success_stories
BEGIN
  UPDATE success_stories SET updated_at = datetime('now') WHERE id = NEW.id;
END;

CREATE TRIGGER IF NOT EXISTS update_about_content_timestamp 
AFTER UPDATE ON about_content
BEGIN
  UPDATE about_content SET updated_at = datetime('now') WHERE id = NEW.id;
END;

CREATE TRIGGER IF NOT EXISTS update_membership_benefits_timestamp 
AFTER UPDATE ON membership_benefits
BEGIN
  UPDATE membership_benefits SET updated_at = datetime('now') WHERE id = NEW.id;
END;

CREATE TRIGGER IF NOT EXISTS update_club_guidelines_timestamp 
AFTER UPDATE ON club_guidelines
BEGIN
  UPDATE club_guidelines SET updated_at = datetime('now') WHERE id = NEW.id;
END;