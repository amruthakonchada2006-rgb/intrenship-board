const internships = [
  {
    title: "Frontend Developer Intern",
    company: "TechStart",
    category: "Web Development",
    location: "Remote",
    duration: "2 Months",
    icon: "💻"
  },
  {
    title: "Python Developer Intern",
    company: "CodeWorks",
    category: "Python",
    location: "Remote",
    duration: "3 Months",
    icon: "🐍"
  },
  {
    title: "AI / ML Intern",
    company: "FutureAI",
    category: "AI/ML",
    location: "Hyderabad",
    duration: "3 Months",
    icon: "🤖"
  },
  {
    title: "Java Developer Intern",
    company: "DevStudio",
    category: "Java",
    location: "Remote",
    duration: "2 Months",
    icon: "☕"
  },
  {
    title: "Web Design Intern",
    company: "Creative Labs",
    category: "Web Development",
    location: "Hyderabad",
    duration: "2 Months",
    icon: "🎨"
  },
  {
    title: "Machine Learning Intern",
    company: "DataSpark",
    category: "AI/ML",
    location: "Remote",
    duration: "3 Months",
    icon: "📊"
  }
];

const internshipList = document.getElementById("internshipList");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const searchBtn = document.getElementById("searchBtn");
const resultCount = document.getElementById("resultCount");
const noResults = document.getElementById("noResults");

function displayInternships() {
  const searchText = searchInput.value.toLowerCase().trim();
  const selectedCategory = categoryFilter.value.toLowerCase();

  const filtered = internships.filter(function (internship) {
    const matchesSearch =
      internship.title.toLowerCase().includes(searchText) ||
      internship.company.toLowerCase().includes(searchText) ||
      internship.category.toLowerCase().includes(searchText);

    const matchesCategory =
      selectedCategory === "all" ||
      internship.category.toLowerCase() === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  internshipList.innerHTML = filtered.map(function (internship) {
    return `
      <article class="card">
        <div class="card-icon">${internship.icon}</div>
        <h3>${internship.title}</h3>
        <p class="company">${internship.company}</p>
        <span class="category">${internship.category}</span>
        <p class="details">
          📍 ${internship.location}<br>
          🕒 Duration: ${internship.duration}
        </p>
        <button class="apply-btn"
          data-title="${internship.title}">
          View / Apply
        </button>
      </article>
    `;
  }).join("");

  resultCount.textContent = filtered.length + " internships";
  noResults.hidden = filtered.length !== 0;
}

searchBtn.addEventListener("click", displayInternships);

searchInput.addEventListener("input", displayInternships);

categoryFilter.addEventListener("change", displayInternships);

internshipList.addEventListener("click", function (event) {
  const button = event.target.closest(".apply-btn");

  if (button) {
    alert(
      "You selected: " + button.dataset.title +
      "\n\nThis is a demo project. No real application was submitted."
    );
  }
});

displayInternships();
document.addEventListener('DOMContentLoaded', () => {
  const internshipsList = document.getElementById('internships'); // Or your container ID
  const loadingEl = document.getElementById('loading');
  const errorEl = document.getElementById('error-message');
  const applicationForm = document.getElementById('applicationForm');
  const formResponse = document.getElementById('formResponse');

  // Fetch Internships with Loading & Error States
  async function fetchInternships() {
    if (loadingEl) loadingEl.style.display = 'block';
    if (errorEl) errorEl.style.display = 'none';

    try {
      const response = await fetch('/api/internships');
      if (!response.ok) throw new Error('Failed to fetch');
      
      const data = await response.json();
      
      if (loadingEl) loadingEl.style.display = 'none';
      
      // Render Internships (adjust based on your existing rendering logic)
      console.log('Internships loaded:', data);
    } catch (err) {
      if (loadingEl) loadingEl.style.display = 'none';
      if (errorEl) errorEl.style.display = 'block';
    }
  }

  // Handle Application Form Submission
  if (applicationForm) {
    applicationForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('applicantName').value.trim();
      const email = document.getElementById('applicantEmail').value.trim();
      const resume = document.getElementById('resumeUrl').value.trim();

      // Client-side simple validation
      if (!name || !email || !resume) {
        formResponse.style.color = 'red';
        formResponse.textContent = 'All fields are required!';
        return;
      }

      try {
        const response = await fetch('/api/apply', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, resume })
        });

        const result = await response.json();

        if (response.ok) {
          formResponse.style.color = 'green';
          formResponse.textContent = result.message;
          applicationForm.reset();
        } else {
          formResponse.style.color = 'red';
          formResponse.textContent = result.errors ? result.errors[0].msg : 'Submission failed.';
        }
      } catch (err) {
        formResponse.style.color = 'red';
        formResponse.textContent = 'Server error. Please try again later.';
      }
    });
  }

  fetchInternships();
});