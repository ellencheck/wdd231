fetch('data/courses.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('courses-list');
    container.innerHTML = data.map(c => `
      <div class="course">
        <h3>${c.title}</h3>
        <p>${c.description}</p>
        <button>Sign Up</button>
      </div>
    `).join('');
  })
  .catch(err => console.error("Error loading courses:", err));

