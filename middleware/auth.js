function requireAuth(req, res, next) {
  if (req.session && req.session.authenticated) {
    return next();
  }
  res.status(401).json({ success: false, error: 'Authentication required.' });
}

function checkAuth(req, res, next) {
  if (req.session && req.session.authenticated) {
    return next();
  }
  if (req.accepts('html')) {
    return res.redirect('/admin');
  }
  res.status(401).json({ success: false, error: 'Authentication required.' });
}

module.exports = { requireAuth, checkAuth };
