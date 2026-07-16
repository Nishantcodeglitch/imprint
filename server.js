const express = require('express');
const session = require('express-session');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');
const fs = require('fs');
const config = require('./config');
const authRoutes = require('./routes/auth');
const gigRoutes = require('./routes/gigs');
const uploadRoutes = require('./routes/upload');

const app = express();
const TRUSTED_ORIGINS = config.cors.allowedOrigin.split(',').map(s => s.trim());

app.set('x-powered-by', false);

/* ── Security Headers (helmet with CSP) ── */
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'",
        'https://widget.mixcloud.com',
        'https://w.soundcloud.com',
        'https://www.googletagmanager.com',
        'https://www.google.com',
        'https://fonts.googleapis.com',
      ],
      styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      imgSrc: ["'self'", 'data:', 'blob:',
        'https://*.soundcloud.com',
        'https://i1.sndcdn.com',
        'https://images.unsplash.com',
      ],
      fontSrc: ["'self'", 'https://fonts.gstatic.com'],
      connectSrc: ["'self'", 'https://api.mixcloud.com', 'https://api.soundcloud.com'],
      frameSrc: ["'self'", 'https://www.mixcloud.com', 'https://w.soundcloud.com',
        'https://www.google.com',
      ],
      mediaSrc: ["'self'", 'blob:'],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));

/* ── Logging ── */
app.use(morgan(config.isProduction ? 'combined' : 'dev'));

/* ── CORS ── */
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || TRUSTED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

/* ── Body Parsing ── */
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false }));

/* ── Rate Limiting ── */
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, error: 'Too many login attempts. Try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 30,
  message: { success: false, error: 'Too many uploads. Try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { success: false, error: 'Too many requests. Try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

/* ── Session ── */
app.use(session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: config.isProduction,
    sameSite: 'lax',
    maxAge: 60 * 60 * 1000,
  },
}));

/* ── Static Files ── */
app.use('/css', express.static(path.join(__dirname, 'css'), { maxAge: '7d' }));
app.use('/js', express.static(path.join(__dirname, 'js'), { maxAge: '7d' }));
app.use('/assets', express.static(path.join(__dirname, 'assets'), { maxAge: '30d' }));
app.use('/html', express.static(path.join(__dirname, 'html')));

/* ── SEO Files ── */
app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send(fs.readFileSync(path.join(__dirname, 'robots.txt'), 'utf-8'));
});

app.get('/sitemap.xml', (req, res) => {
  res.type('application/xml');
  res.send(fs.readFileSync(path.join(__dirname, 'sitemap.xml'), 'utf-8'));
});

/* ── Auth Routes ── */
app.use('/api/auth', loginLimiter, authRoutes);

/* ── Gig Routes ── */
app.use('/api/gigs', apiLimiter, gigRoutes);

/* ── Upload Routes ── */
app.use('/api/upload', uploadLimiter, uploadRoutes);

/* ── React SPA ── */
const distPath = config.distPath;
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    if (req.path.startsWith('/api/')) return res.status(404).json({ success: false, error: 'Not found' });
    const spaPath = path.join(distPath, 'index.html');
    if (fs.existsSync(spaPath)) {
      let html = fs.readFileSync(spaPath, 'utf-8');
      html = html.replace(
        '</head>',
        `<link rel="manifest" href="/site.webmanifest">\n</head>`
      );
      res.send(html);
    } else {
      res.status(404).send('Not found');
    }
  });
}

/* ── Error Handler ── */
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ success: false, error: 'File too large. Maximum size is 5MB.' });
  }
  if (err.message && err.message.includes('Invalid file')) {
    return res.status(400).json({ success: false, error: err.message });
  }
  res.status(500).json({ success: false, error: 'Internal server error.' });
});

/* ── Uncaught Exceptions / Rejections ── */
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
});

/* ── Start ── */
const server = app.listen(config.port, () => {
  console.log(`\n  IMPRINT server running at http://localhost:${config.port}`);
  console.log(`  Environment: ${config.nodeEnv}`);
  if (fs.existsSync(distPath)) {
    console.log(`  React SPA:    http://localhost:${config.port}/`);
  }
  console.log(`  API:          http://localhost:${config.port}/api/gigs`);
  if (!fs.existsSync(distPath)) {
    console.log(`  WARNING: dist/ not found — run "npm run build" first, or use "npm run dev"`);
  }
});

module.exports = server;
