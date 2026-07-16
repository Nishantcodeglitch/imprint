const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const fs = require('fs');
const config = require('../config');

fs.mkdirSync(config.upload.uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.upload.uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const safeName = Date.now() + '-' + crypto.randomBytes(8).toString('hex') + ext;
    cb(null, safeName);
  },
});

function fileFilter(req, file, cb) {
  const ext = path.extname(file.originalname).toLowerCase();
  if (!config.upload.allowedExtensions.includes(ext)) {
    return cb(new Error(`Invalid file extension "${ext}". Allowed: ${config.upload.allowedExtensions.join(', ')}`), false);
  }
  if (!config.upload.allowedMimeTypes.includes(file.mimetype)) {
    return cb(new Error(`Invalid MIME type "${file.mimetype}".`), false);
  }
  cb(null, true);
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: config.upload.maxSize },
});

module.exports = upload;
