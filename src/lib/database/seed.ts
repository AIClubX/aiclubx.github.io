import { initializeDatabase } from './index';
import { logger } from '../../utils/logger';
import { hashPassword } from '../../utils/auth';

async function main() {
  try {
    const db = await initializeDatabase();

    // Check if admin exists
    const adminUser = await db.query(
      'SELECT * FROM users WHERE email = ?',
      ['admin@aiclubx.org']
    );

    if (!adminUser.length) {
      // Create admin user if doesn't exist
      const hashedPassword = await hashPassword('Admin123!');
      await db.execute(
        `INSERT INTO users (id, name, email, hashed_password, role)
         VALUES (?, ?, ?, ?, ?)`,
        [
          crypto.randomUUID(),
          'Admin User',
          'admin@aiclubx.org',
          hashedPassword,
          'club_admin'
        ]
      );
      logger.info('Admin user created successfully');
    } else {
      logger.info('Admin user already exists');
    }

    process.exit(0);
  } catch (error) {
    logger.error('Error seeding database:', error);
    process.exit(1);
  }
}

main();