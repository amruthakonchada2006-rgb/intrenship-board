const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');

const app = express();
const PORT = process.env.PORT || 3000;

// Security Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate Limiter Setup (15 mins window, max 100 requests)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests, please try again later.' }
});
app.use('/api/', limiter);

// Dummy Data
let internships = [
  { id: 1, title: 'Frontend Developer Intern', company: 'Tech Corp', location: 'Remote' },
  { id: 2, title: 'Backend Developer Intern', company: 'Data Solutions', location: 'Hyderabad' }
];

// GET Internships Endpoint
app.get('/api/internships', (req, res) => {
  res.json(internships);
});

// POST Application Endpoint (Server-side Validation)
app.post('/api/apply', [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('resume').isURL().withMessage('Valid resume URL is required')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  res.status(200).json({ message: 'Application submitted successfully!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});