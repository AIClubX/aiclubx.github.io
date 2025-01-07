import { createClient } from '@libsql/client';
import { createHash } from 'crypto';

async function hashPassword(password) {
  const hash = createHash('sha256');
  hash.update(password);
  return hash.digest('hex');
}

async function main() {
  try {
    const client = createClient({
      url: 'file:local.db'
    });

    // Create admin user with fixed credentials
    const adminId = '1';
    const adminEmail = 'admin@aiclubx.org';
    const adminPassword = 'Admin123!';
    const hashedPassword = await hashPassword(adminPassword);

    // Use INSERT OR REPLACE to ensure admin user exists with correct credentials
    await client.execute(
      `INSERT OR REPLACE INTO users (id, name, email, hashed_password, role)
       VALUES (?, ?, ?, ?, ?)`,
      [
        adminId,
        'Admin User',
        adminEmail,
        hashedPassword,
        'club_admin'
      ]
    );

    console.log('Database seeded successfully');
    console.log('Admin credentials:');
    console.log('Email:', adminEmail);
    console.log('Password:', adminPassword);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

main();