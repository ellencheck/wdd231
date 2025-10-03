fetch('data/teachers.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('teachers-list');
    container.innerHTML = data.map(t => `
      <div class="teacher">
        <h3>${t.name}</h3>
        <p>${t.subject}</p>
      </div>
    `).join('');
  })
  .catch(err => console.error("Error loading teachers:", err));
