import express from 'express';
import { getDatabase } from '../../lib/database';
import { authenticate } from '../middleware/auth';
import { logger } from '../../utils/logger';

const router = express.Router();

// Get all events
router.get('/', async (req, res) => {
  try {
    const db = getDatabase();
    const events = await db.query('SELECT * FROM events ORDER BY date DESC');
    res.json(events);
  } catch (error) {
    logger.error('Error fetching events:', error);
    res.status(500).json({ message: 'Failed to fetch events' });
  }
});

// Get single event
router.get('/:id', async (req, res) => {
  try {
    const db = getDatabase();
    const [event] = await db.query('SELECT * FROM events WHERE id = ?', [req.params.id]);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    logger.error('Error fetching event:', error);
    res.status(500).json({ message: 'Failed to fetch event' });
  }
});

// Register for event
router.post('/:id/register', authenticate, async (req, res) => {
  try {
    const db = getDatabase();
    const { userId, dietaryRequirements, notes } = req.body;
    const eventId = req.params.id;

    // Check if event exists
    const [event] = await db.query('SELECT * FROM events WHERE id = ?', [eventId]);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if already registered
    const [existing] = await db.query(
      'SELECT * FROM event_registrations WHERE event_id = ? AND user_id = ?',
      [eventId, userId]
    );
    if (existing) {
      return res.status(400).json({ message: 'Already registered for this event' });
    }

    // Create registration
    const registrationId = crypto.randomUUID();
    await db.execute(
      `INSERT INTO event_registrations (id, event_id, user_id, dietary_requirements, notes)
       VALUES (?, ?, ?, ?, ?)`,
      [registrationId, eventId, userId, dietaryRequirements, notes]
    );

    const [registration] = await db.query(
      'SELECT * FROM event_registrations WHERE id = ?',
      [registrationId]
    );

    res.status(201).json(registration);
  } catch (error) {
    logger.error('Error registering for event:', error);
    res.status(500).json({ message: 'Failed to register for event' });
  }
});

// Get event registrations (admin only)
router.get('/:id/registrations', authenticate, async (req, res) => {
  try {
    const db = getDatabase();
    const registrations = await db.query(
      `SELECT r.*, u.name as user_name, u.email as user_email
       FROM event_registrations r
       JOIN users u ON r.user_id = u.id
       WHERE r.event_id = ?
       ORDER BY r.created_at DESC`,
      [req.params.id]
    );
    res.json(registrations);
  } catch (error) {
    logger.error('Error fetching registrations:', error);
    res.status(500).json({ message: 'Failed to fetch registrations' });
  }
});

// Update registration status (admin only)
router.put('/:eventId/registrations/:registrationId', authenticate, async (req, res) => {
  try {
    const db = getDatabase();
    const { status } = req.body;
    const { eventId, registrationId } = req.params;

    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    await db.execute(
      'UPDATE event_registrations SET status = ? WHERE id = ? AND event_id = ?',
      [status, registrationId, eventId]
    );

    const [registration] = await db.query(
      'SELECT * FROM event_registrations WHERE id = ?',
      [registrationId]
    );

    if (!registration) {
      return res.status(404).json({ message: 'Registration not found' });
    }

    res.json(registration);
  } catch (error) {
    logger.error('Error updating registration:', error);
    res.status(500).json({ message: 'Failed to update registration' });
  }
});

export default router;