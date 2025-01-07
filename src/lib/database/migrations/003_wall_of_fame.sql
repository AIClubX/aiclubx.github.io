-- Create contributors table if it doesn't exist
CREATE TABLE IF NOT EXISTS contributors (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  bio TEXT NOT NULL,
  image TEXT NOT NULL,
  featured INTEGER NOT NULL DEFAULT 0,
  start_date TEXT NOT NULL,
  end_date TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Create trigger for updating timestamps
CREATE TRIGGER IF NOT EXISTS update_contributors_timestamp 
AFTER UPDATE ON contributors
BEGIN
  UPDATE contributors SET updated_at = datetime('now') WHERE id = NEW.id;
END;

-- Insert initial contributors if they don't exist
INSERT OR IGNORE INTO contributors (id, name, title, bio, image, featured, start_date)
VALUES 
  ('1', 'Dr. Sarah Chen', 'AI Research Lead at Stanford', 'Pioneer in neural network architectures with groundbreaking contributions to deep learning optimization.', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330', 1, date('now')),
  ('2', 'Michael Rodriguez', 'Chapter Head, MIT AI Club', 'Led the development of an award-winning AI ethics curriculum now adopted by 20+ universities.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d', 1, date('now')),
  ('3', 'Dr. Aisha Patel', 'AI Ethics Advisor', 'Renowned expert in responsible AI development, focusing on fairness and transparency in machine learning systems.', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2', 1, date('now'));