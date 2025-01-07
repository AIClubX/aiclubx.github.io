const crypto = require('crypto');

// Generate a 256-bit (32-byte) random string
const secret = crypto.randomBytes(32).toString('base64');
console.log('Generated JWT Secret:');
console.log(secret);