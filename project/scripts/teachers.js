document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById('teachers-list');

  fetch('data/teachers.json')
    .then(response => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    })
    .then(teachers => {
      container.innerHTML = teachers.map(t => `
        <div class="teacher-card">
          <img src="${t.photo}" alt="Photo of ${t.name}" loading="lazy">
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
      console.error("Error loading teachers:", err);
      container.innerText = "Failed to load teachers.";
    });
});

