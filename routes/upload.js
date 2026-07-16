const { Router } = require('express');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const { requireAuth } = require('../middleware/auth');
const config = require('../config');

const router = Router();

function validateUpload(filename, mimeType, buffer) {
  const ext = path.extname(filename).toLowerCase();
  if (!config.upload.allowedExtensions.includes(ext)) {
    return { valid: false, error: `Invalid file extension "${ext}". Allowed: ${config.upload.allowedExtensions.join(', ')}` };
  }

  if (!config.upload.allowedMimeTypes.includes(mimeType)) {
    return { valid: false, error: `Invalid MIME type "${mimeType}". Allowed: ${config.upload.allowedMimeTypes.join(', ')}` };
  }

  const magicBytes = {
    'image/jpeg': [0xFF, 0xD8, 0xFF],
    'image/png': [0x89, 0x50, 0x4E, 0x47],
    'image/gif': [0x47, 0x49, 0x46],
    'image/webp': [0x52, 0x49, 0x46, 0x46],
  };

  const expected = magicBytes[mimeType];
  if (expected) {
    const header = Array.from(buffer.slice(0, expected.length));
    const matches = expected.every((byte, i) => header[i] === byte);
    if (!matches) {
      return { valid: false, error: 'File content does not match declared type.' };
    }
  }

  if (buffer.length > config.upload.maxSize) {
    return { valid: false, error: 'File too large. Maximum size is 5MB.' };
  }

  return { valid: true };
}

router.post('/', requireAuth, (req, res) => {
  try {
    const { filename, data, mimeType } = req.body;
    if (!filename || !data) {
      return res.status(400).json({ success: false, error: 'Missing file data' });
    }

    const matches = data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return res.status(400).json({ success: false, error: 'Invalid base64 encoding' });
    }

    const detectedMime = mimeType || matches[1];
    const imageBuffer = Buffer.from(matches[2], 'base64');

    const validation = validateUpload(filename, detectedMime, imageBuffer);
    if (!validation.valid) {
      return res.status(400).json({ success: false, error: validation.error });
    }

    const ext = path.extname(filename).toLowerCase();
    const safeFilename = Date.now() + '-' + crypto.randomBytes(4).toString('hex') + ext;
    const uploadDir = config.upload.uploadDir;
    fs.mkdirSync(uploadDir, { recursive: true });
    const filepath = path.join(uploadDir, safeFilename);

    fs.writeFileSync(filepath, imageBuffer);

    const url = '/assets/uploads/' + safeFilename;
    res.json({ success: true, url });
  } catch (err) {
    console.error('Error uploading file:', err);
    res.status(500).json({ success: false, error: 'Failed to upload image' });
  }
});

module.exports = router;
