const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const config = {
  port: parseInt(process.env.PORT, 10) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',

  sessionSecret: process.env.SESSION_SECRET || require('crypto').randomBytes(32).toString('hex'),

  admin: {
    username: process.env.ADMIN_USERNAME || 'admin',
    passwordHash: process.env.ADMIN_PASSWORD_HASH || '',
  },

  cors: {
    allowedOrigin: process.env.ALLOWED_ORIGIN || 'http://localhost:3000',
  },

  upload: {
    maxSize: 5 * 1024 * 1024,
    allowedExtensions: ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
    allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    uploadDir: path.join(__dirname, '..', 'assets', 'uploads'),
  },

  dataFile: path.join(__dirname, '..', 'data', 'gigs.json'),
  distPath: path.join(__dirname, '..', 'dist'),
};

module.exports = config;
