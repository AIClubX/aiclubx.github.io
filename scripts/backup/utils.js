const fs = require('fs');
const path = require('path');

// Utility to check if a directory should be skipped
function shouldSkipDirectory(dirName) {
  const skipDirs = ['node_modules', '.git', 'dist', 'coverage'];
  return skipDirs.includes(dirName);
}

// Utility to ensure directory exists
function ensureDirectoryExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Copy files with error handling
function copyFile(source, target) {
  try {
    fs.copyFileSync(source, target);
    return true;
  } catch (error) {
    console.error(`Failed to copy file ${source}:`, error.message);
    return false;
  }
}

module.exports = {
  shouldSkipDirectory,
  ensureDirectoryExists,
  copyFile
};