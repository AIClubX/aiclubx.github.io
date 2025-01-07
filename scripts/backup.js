const fs = require('fs');
const path = require('path');

async function createBackup(sourceDir, backupDir) {
  try {
    // Create backup directory if it doesn't exist
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    // Copy files recursively
    copyRecursive(sourceDir, backupDir);

    return backupDir;
  } catch (error) {
    console.error('Backup failed:', error);
    throw error;
  }
}

function copyRecursive(source, target) {
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

async function main() {
  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const sourceDir = './src';
    const backupDir = `./backups/${timestamp}`;
    
    const backupPath = await createBackup(sourceDir, backupDir);
    console.log(`Backup created successfully at: ${backupPath}`);
  } catch (error) {
    console.error('Failed to create backup:', error);
    process.exit(1);
  }
}

main();