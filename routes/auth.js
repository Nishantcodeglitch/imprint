const { Router } = require('express');
const bcrypt = require('bcrypt');
const config = require('../config');

const router = Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ success: false, error: 'Username and password are required.' });
  }

  const usernameMatch = username === config.admin.username;

  if (!usernameMatch) {
    return res.status(401).json({ success: false, error: 'Invalid credentials.' });
  }

  const passwordMatch = config.admin.passwordHash
    ? bcrypt.compareSync(password, config.admin.passwordHash)
    : false;

  if (!passwordMatch) {
    return res.status(401).json({ success: false, error: 'Invalid credentials.' });
  }

  req.session.authenticated = true;
  req.session.username = username;
  res.json({ success: true });
});

router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.json({ success: true });
  });
});

router.get('/check', (req, res) => {
  res.json({ success: true, authenticated: !!(req.session && req.session.authenticated) });
});

module.exports = router;
