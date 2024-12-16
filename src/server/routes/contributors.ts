import express from 'express';
import { getDatabase } from '../../lib/database';
import { ContributorRepository } from '../../lib/database/repositories/ContributorRepository';
import { logger } from '../../utils/logger';
import { authenticate, authorize } from '../middleware/auth';

const router = express.Router();

// Get all contributors
router.get('/', async (req, res) => {
  try {
    const db = getDatabase();
    const repository = new ContributorRepository(db);
    const contributors = await repository.findAll();
    res.json(contributors);
  } catch (error) {
    logger.error('Error fetching contributors:', error);
    res.status(500).json({ message: 'Failed to fetch contributors' });
  }
});

// Get featured contributors
router.get('/featured', async (req, res) => {
  try {
    const db = getDatabase();
    const repository = new ContributorRepository(db);
    const contributors = await repository.findFeatured();
    res.json(contributors);
  } catch (error) {
    logger.error('Error fetching featured contributors:', error);
    res.status(500).json({ message: 'Failed to fetch featured contributors' });
  }
});

// Create contributor (protected route)
router.post('/', authenticate, authorize(['club_admin']), async (req, res) => {
  try {
    const db = getDatabase();
    const repository = new ContributorRepository(db);
    const contributor = await repository.create(req.body);
    res.status(201).json(contributor);
  } catch (error) {
    logger.error('Error creating contributor:', error);
    res.status(500).json({ message: 'Failed to create contributor' });
  }
});

// Update contributor (protected route)
router.put('/:id', authenticate, authorize(['club_admin']), async (req, res) => {
  try {
    const db = getDatabase();
    const repository = new ContributorRepository(db);
    const contributor = await repository.update(req.params.id, req.body);
    res.json(contributor);
  } catch (error) {
    logger.error('Error updating contributor:', error);
    res.status(500).json({ message: 'Failed to update contributor' });
  }
});

// Delete contributor (protected route)
router.delete('/:id', authenticate, authorize(['club_admin']), async (req, res) => {
  try {
    const db = getDatabase();
    const repository = new ContributorRepository(db);
    await repository.delete(req.params.id);
    res.status(204).send();
  } catch (error) {
    logger.error('Error deleting contributor:', error);
    res.status(500).json({ message: 'Failed to delete contributor' });
  }
});

export default router;