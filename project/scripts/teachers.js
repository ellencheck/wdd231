fetch('data/teachers.json')
  .then(response => {
    if (!response.ok) throw new Error("Cannot load teachers.json");
    return response.json();
  })
  .then(teachers => {
    const container = document.getElementById('teachers-list');
    container.innerHTML = teachers.map(t => `
      <div class="teacher-card">
        <img src="${t.photo}" alt="${t.name}">
        <h3>${t.name}</h3>
        <p><strong>Language:</strong> ${t.language}</p>
        <p><strong>City:</strong> ${t.city}, ${t.country}</p>
        <p><strong>Education:</strong> ${t.education}</p>
        <p><strong>Experience:</strong> ${t.experience}</p>
        <p>${t.bio}</p>
      </div>
    `).join('');
  })
  .catch(err => {
    console.error(err);
    document.getElementById('teachers-list').innerText = "Failed to load teachers.";
  });

