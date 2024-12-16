import fs from 'fs';
import path from 'path';

export async function createBackup(sourceDir: string, backupDir: string) {
  try {
    // Create backup directory if it doesn't exist
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    // Get timestamp for backup folder name
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = path.join(backupDir, `backup-${timestamp}`);
    fs.mkdirSync(backupPath);

    // Copy files recursively
    copyRecursive(sourceDir, backupPath);

    return backupPath;
  } catch (error) {
    console.error('Backup failed:', error);
    throw error;
  }
}

function copyRecursive(source: string, target: string) {
  const files = fs.readdirSync(source);

  files.forEach(file => {
    const sourcePath = path.join(source, file);
    const targetPath = path.join(target, file);

    if (fs.lstatSync(sourcePath).isDirectory()) {
      // Skip node_modules and .git directories
      if (file === 'node_modules' || file === '.git') {
        return;
      }
      fs.mkdirSync(targetPath, { recursive: true });
      copyRecursive(sourcePath, targetPath);
    } else {
      fs.copyFileSync(sourcePath, targetPath);
    }
  });
}