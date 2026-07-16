# IMPRINT — DJ Website

Goa-based DJ, producer, and nightlife curator. Built with React (Vite) + Express backend.

## Quick Start

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env

# Generate a password hash (replace 'yourpassword' with your actual password)
node scripts/hash-password.js yourpassword

# Copy the output to .env as ADMIN_PASSWORD_HASH

# Set ADMIN_USERNAME in .env (default: admin)

# Development (requires separate Vite dev server + Express)
npm run dev    # Vite dev server on :5173
npm run start  # Express backend on :3000

# Production build
npm run build
npm run start
```

## Environment Variables

See `.env.example` for all variables.

Key variables:
- `PORT` — Server port (default: 3000)
- `SESSION_SECRET` — Session encryption key (auto-generated if empty)
- `ADMIN_USERNAME` — Admin username (default: admin)
- `ADMIN_PASSWORD_HASH` — bcrypt hash of admin password (generate with `node scripts/hash-password.js <password>`)
- `ALLOWED_ORIGIN` — CORS origin (comma-separated for multiple)
- `NODE_ENV` — Set to `production` for secure cookies and production logging

## Project Structure

```
├── config/         # Configuration
├── middleware/      # Auth, upload middleware
├── routes/         # API routes (auth, gigs, upload)
├── services/       # Business logic (gigService)
├── scripts/        # Utility scripts
├── public/         # Static assets (favicon, manifest)
├── css/            # Stylesheet
├── js/             # Client-side JS
├── html/           # Static HTML pages (legacy)
├── assets/         # Images, videos, uploads
├── data/           # JSON data store
├── src/            # React SPA
└── dist/           # Built React app
```

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/login | No | Login with username + password |
| POST | /api/auth/logout | No | Destroy session |
| GET | /api/auth/check | No | Check if authenticated |
| GET | /api/gigs | No | List all gigs |
| POST | /api/gigs | Yes | Create a gig |
| PUT | /api/gigs/:id | Yes | Update a gig |
| DELETE | /api/gigs/:id | Yes | Delete a gig |
| POST | /api/upload | Yes | Upload an image (base64) |

## Deployment

1. Set `NODE_ENV=production`
2. Set `ALLOWED_ORIGIN` to your production domain
3. Set a strong `SESSION_SECRET`
4. Set `ADMIN_USERNAME` and `ADMIN_PASSWORD_HASH`
5. Run `npm run build` to build the React SPA
6. Run `npm run start` to start the server

## Security Features

- bcrypt password hashing
- HTTP-only session cookies
- Helmet security headers (CSP, XSS, frameguard, etc.)
- Rate limiting on login, upload, and API endpoints
- CORS restricted to allowed origins
- File upload validation (extension, MIME type, magic bytes)
- No Firebase dependency
- Session-based admin authentication
