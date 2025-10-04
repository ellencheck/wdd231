fetch('data/courses.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('courses-list');
    const formSelect = document.getElementById('selectedCourse');

    container.innerHTML = ''; // убираем "Loading courses..."

    data.courses.forEach((course, langIndex) => {
      course.levels.forEach((level, lvlIndex) => {
        const courseDiv = document.createElement('div');
        courseDiv.className = 'course';
        courseDiv.innerHTML = `
          <h3>${course.flag} ${course.language} – ${level.level}</h3>
          <p>${level.description}</p>
          <p><strong>Duration:</strong> ${level.duration}</p>
          <p><strong>Price:</strong> ${level.price}</p>
          <button type="button" class="register-btn">Sign Up</button>
        `;
        container.appendChild(courseDiv);

        // Кнопка регистрации
        courseDiv.querySelector('.register-btn').addEventListener('click', () => {
          formSelect.value = `${langIndex}-${lvlIndex}`;
          const form = document.getElementById('registration-form');
          form.style.display = 'block';
          form.scrollIntoView({ behavior: 'smooth' });
        });

        // Добавляем опцию в select
        const option = document.createElement('option');
        option.value = `${langIndex}-${lvlIndex}`;
        option.textContent = `${course.flag} ${course.language} – ${level.level} (${level.price})`;
        formSelect.appendChild(option);
      });
    });

    // Отправка формы
    document.getElementById('courseForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const [langIndex, lvlIndex] = formSelect.value.split('-').map(Number);
      const course = data.courses[langIndex];
      const level = course.levels[lvlIndex];
      const name = document.getElementById('name').value;

      alert(`Thank you, ${name}! You registered for "${course.flag} ${course.language} – ${level.level}".`);
      this.reset();
      document.getElementById('registration-form').style.display = 'none';
    });
  })
  .catch(err => console.error("Error loading courses:", err));
