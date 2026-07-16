const { Router } = require('express');
const gigService = require('../services/gigService');
const { requireAuth } = require('../middleware/auth');

const router = Router();

router.get('/', (req, res) => {
  try {
    const gigs = gigService.getAll();
    res.json({ success: true, data: gigs });
  } catch (err) {
    console.error('Error reading gigs:', err);
    res.status(500).json({ success: false, error: 'Failed to load gigs.' });
  }
});

router.post('/', requireAuth, (req, res) => {
  try {
    const errors = gigService.validateGig(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    const newGig = gigService.create(req.body);
    res.status(201).json({ success: true, data: newGig });
  } catch (err) {
    console.error('Error creating gig:', err);
    res.status(500).json({ success: false, error: 'Failed to create gig.' });
  }
});

router.put('/:id', requireAuth, (req, res) => {
  try {
    const errors = gigService.validateGig(req.body, true);
    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    const updated = gigService.update(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Gig not found.' });
    }

    res.json({ success: true, data: updated });
  } catch (err) {
    console.error('Error updating gig:', err);
    res.status(500).json({ success: false, error: 'Failed to update gig.' });
  }
});

router.delete('/:id', requireAuth, (req, res) => {
  try {
    const deleted = gigService.remove(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Gig not found.' });
    }

    res.json({ success: true, data: deleted });
  } catch (err) {
    console.error('Error deleting gig:', err);
    res.status(500).json({ success: false, error: 'Failed to delete gig.' });
  }
});

module.exports = router;
