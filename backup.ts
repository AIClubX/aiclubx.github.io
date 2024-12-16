import { createBackup } from './src/utils/backup';

async function main() {
  try {
    const sourceDir = './src';
    const backupDir = './backups';
    
    const backupPath = await createBackup(sourceDir, backupDir);
    console.log(`Backup created successfully at: ${backupPath}`);
  } catch (error) {
    console.error('Failed to create backup:', error);
    process.exit(1);
  }
}

main();