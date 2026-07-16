const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const config = require('../config');

function readGigs() {
  try {
    const raw = fs.readFileSync(config.dataFile, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    if (err.code === 'ENOENT') {
      fs.mkdirSync(path.dirname(config.dataFile), { recursive: true });
      fs.writeFileSync(config.dataFile, '[]', 'utf-8');
      return [];
    }
    throw err;
  }
}

function writeGigs(gigs) {
  fs.writeFileSync(config.dataFile, JSON.stringify(gigs, null, 2), 'utf-8');
}

function validateGig(body, isUpdate = false) {
  const errors = [];
  const { title, description, category, date } = body;

  if (!isUpdate || body.hasOwnProperty('title')) {
    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      errors.push('Title is required and must be a non-empty string.');
    } else if (title.trim().length > 200) {
      errors.push('Title must be 200 characters or fewer.');
    }
  }

  if (!isUpdate || body.hasOwnProperty('description')) {
    if (!description || typeof description !== 'string' || description.trim().length === 0) {
      errors.push('Description is required and must be a non-empty string.');
    } else if (description.trim().length > 1000) {
      errors.push('Description must be 1000 characters or fewer.');
    }
  }

  if (!isUpdate || body.hasOwnProperty('category')) {
    if (!category || typeof category !== 'string' || category.trim().length === 0) {
      errors.push('Category is required and must be a non-empty string.');
    }
  }

  if (!isUpdate || body.hasOwnProperty('date')) {
    if (!date || typeof date !== 'string' || date.trim().length === 0) {
      errors.push('Date is required.');
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(date) && !isUpdate) {
      errors.push('Date must be in YYYY-MM-DD format.');
    }
  }

  if (body.hasOwnProperty('imageUrl') && body.imageUrl) {
    if (typeof body.imageUrl !== 'string') {
      errors.push('Image URL must be a string.');
    }
  }

  return errors;
}

function formatDatePill(dateStr) {
  try {
    const d = new Date(dateStr + 'T00:00:00');
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  } catch {
    return dateStr;
  }
}

function getAll() {
  const gigs = readGigs();
  gigs.sort((a, b) => new Date(b.date) - new Date(a.date));
  return gigs;
}

function create(data) {
  const gigs = readGigs();
  const newGig = {
    id: uuidv4(),
    title: data.title.trim(),
    description: data.description.trim(),
    category: data.category.trim(),
    date: data.date.trim(),
    datePill: data.datePill ? data.datePill.trim() : formatDatePill(data.date.trim()),
    time: data.time ? data.time.trim() : '',
    location: data.location ? data.location.trim() : '',
    imageUrl: data.imageUrl ? data.imageUrl.trim() : '',
    status: data.status || 'upcoming',
  };
  gigs.push(newGig);
  writeGigs(gigs);
  return newGig;
}

function update(id, body) {
  const gigs = readGigs();
  const idx = gigs.findIndex(g => g.id === id);
  if (idx === -1) return null;

  const updatable = ['title', 'description', 'category', 'date', 'datePill', 'time', 'location', 'imageUrl', 'status'];
  updatable.forEach(field => {
    if (body.hasOwnProperty(field)) {
      gigs[idx][field] = typeof body[field] === 'string' ? body[field].trim() : body[field];
    }
  });

  if (body.hasOwnProperty('date') && !body.hasOwnProperty('datePill')) {
    gigs[idx].datePill = formatDatePill(gigs[idx].date);
  }

  writeGigs(gigs);
  return gigs[idx];
}

function remove(id) {
  let gigs = readGigs();
  const idx = gigs.findIndex(g => g.id === id);
  if (idx === -1) return null;
  const deleted = gigs.splice(idx, 1)[0];
  writeGigs(gigs);
  return deleted;
}

module.exports = { getAll, create, update, remove, validateGig };
