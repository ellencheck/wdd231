fetch('data/courses.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('courses-list');
    const formSelect = document.getElementById('selectedCourse');

    container.innerHTML = data.courses.map((c, index) => `
      <div class="course">
        <h3>${c.language} – ${c.level}</h3>
        <h3>${c.flag} ${c.language} – ${c.level}</h3>
        <p>${c.description}</p>
        <p><strong>Duration:</strong> ${c.duration}</p>
        <p><strong>Price:</strong> ${c.price}</p>

    data.courses.forEach((c, index) => {
      const option = document.createElement('option');
      option.value = index;
      option.textContent = `${c.language} – ${c.level} (${c.price})`;
      option.textContent = `${c.flag} ${c.language} – ${c.level} (${c.price})`;
      formSelect.appendChild(option);
    });

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;

      alert(`Thank you, ${name}! You registered for "${course.language} – ${course.level}".`);
      alert(`Thank you, ${name}! You registered for "${course.flag} ${course.language} – ${course.level}".`);
      this.reset();
      document.getElementById('registration-form').style.display = 'none';
    });
  })
  .catch(err => console.error("Error loading courses:", err));
