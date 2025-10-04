fetch('data/courses.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('courses-list');
    const formSelect = document.getElementById('selectedCourse');

    container.innerHTML = data.courses.map((c, index) => `
      <div class="course">
        <h3><span class="fi fi-${c.flagCode}"></span> ${c.language} – ${c.level}</h3>
        <p>${c.description}</p>
        <p><strong>Duration:</strong> ${c.duration}</p>
        <p><strong>Price:</strong> ${c.price}</p>
        <button onclick="openForm(${index})">Sign Up</button>
      </div>
    `).join('');

    data.courses.forEach((c, index) => {
      const option = document.createElement('option');
      option.value = index;
      option.textContent = `${c.language} – ${c.level} (${c.price})`;
      formSelect.appendChild(option);
    });

    window.openForm = function(index) {
      formSelect.value = index;
      document.getElementById('registration-form').style.display = 'block';
      document.getElementById('registration-form').scrollIntoView({behavior: "smooth"});
    };

    document.getElementById('courseForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const course = data.courses[formSelect.value];
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;

      alert(`Thank you, ${name}! You registered for "${course.language} – ${course.level}".`);
      this.reset();
      document.getElementById('registration-form').style.display = 'none';
    });
  })
  .catch(err => console.error("Error loading courses:", err));

