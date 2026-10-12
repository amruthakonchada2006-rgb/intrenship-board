const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// In-Memory Database (Temporary Array)
let internships = [];
// 1. GET: Fetch all internships
app.get('/api/internships', (req, res) => {
  res.json(internships);
});

// 2. POST: Add a new internship
app.post('/api/internships', (req, res) => {
  const newInternship = {
    id: Date.now().toString(),
    title: req.body.title,
    company: req.body.company,
    location: req.body.location,
    stipend: req.body.stipend,
    description: req.body.description,
    createdAt: new Date()
  };
  
  internships.unshift(newInternship);
  res.status(201).json(newInternship);
});

// 3. DELETE: Remove an internship by ID
app.delete('/api/internships/:id', (req, res) => {
  const { id } = req.params;
  internships = internships.filter(item => item.id !== id);
  res.json({ message: 'Internship deleted successfully' });
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
