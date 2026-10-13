// Fetch Internships with Loading & Error States
  async function fetchInternships() {
    if (loadingEl) loadingEl.style.display = 'block';
    if (errorEl) errorEl.style.display = 'none';

    try {
      // Mock data for frontend preview on GitHub Pages
      const data = [
        { id: 1, title: 'Frontend Developer Intern', company: 'Tech Corp', location: 'Remote' },
        { id: 2, title: 'Backend Developer Intern', company: 'Data Solutions', location: 'Hyderabad' }
      ];

      if (loadingEl) loadingEl.style.display = 'none';

      // Call your function that renders internships on screen
      if (typeof renderInternships === 'function') {
        renderInternships(data);
      }
    } catch (err) {
      if (loadingEl) loadingEl.style.display = 'none';
      if (errorEl) errorEl.style.display = 'block';
    }
  }