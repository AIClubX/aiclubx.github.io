const fs = require('fs');
const path = require('path');
const { shouldSkipDirectory, ensureDirectoryExists, copyFile } = require('./utils');

async function createBackup() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const sourceDir = path.join(process.cwd(), 'src');
  const backupDir = path.join(process.cwd(), 'backups', timestamp);

  console.log('Starting backup...');
  console.time('Backup completed in');

  try {
    // Ensure backups directory exists
    ensureDirectoryExists(path.join(process.cwd(), 'backups'));

    const stats = {
      copied: 0,
      errors: 0
    };

    function copyRecursive(source, target) {
      ensureDirectoryExists(target);
      const files = fs.readdirSync(source);

      files.forEach(file => {
        const sourcePath = path.join(source, file);
        const targetPath = path.join(target, file);

        if (fs.lstatSync(sourcePath).isDirectory()) {
          if (!shouldSkipDirectory(file)) {
            copyRecursive(sourcePath, targetPath);
          }
        } else {
          if (copyFile(sourcePath, targetPath)) {
            stats.copied++;
          } else {
            stats.errors++;
          }
        }
      });
    }

    copyRecursive(sourceDir, backupDir);
    
    console.timeEnd('Backup completed in');
    console.log(`Files copied: ${stats.copied}`);
    if (stats.errors > 0) {
      console.warn(`Errors encountered: ${stats.errors}`);
    }

    return backupDir;
  } catch (error) {
    console.error('Backup failed:', error);
    throw error;
  }
}

// Only run if called directly
if (require.main === module) {
  createBackup().catch(() => process.exit(1));
}

module.exports = { createBackup };