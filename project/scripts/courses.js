fetch('data/courses.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('courses-list');
    const formSelect = document.getElementById('selectedCourse');

    // Генерация списка курсов
    container.innerHTML = data.courses.map((course, langIndex) => {
      return course.levels.map((level, lvlIndex) => `
        <div class="course">
          <h3>${course.flag} ${course.language} – ${level.level}</h3>
          <p>${level.description}</p>
          <p><strong>Duration:</strong> ${level.duration}</p>
          <p><strong>Price:</strong> ${level.price}</p>
          <button onclick="openForm(${langIndex}, ${lvlIndex})">Sign Up</button>
        </div>
      `).join('');
    }).join('');

    // Заполняем select
    data.courses.forEach((course, langIndex) => {
      course.levels.forEach((level, lvlIndex) => {
        const option = document.createElement('option');
        option.value = `${langIndex}-${lvlIndex}`; // уникальный идентификатор
        option.textContent = `${course.language} – ${level.level} (${level.price})`;
        formSelect.appendChild(option);
      });
    });

    // Форма: открытие
    window.openForm = function(langIndex, lvlIndex) {
      formSelect.value = `${langIndex}-${lvlIndex}`;
      document.getElementById('registration-form').style.display = 'block';
      document.getElementById('registration-form').scrollIntoView({behavior: "smooth"});
    };

    // Отправка формы
    document.getElementById('courseForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const [langIndex, lvlIndex] = formSelect.value.split('-').map(Number);
      const course = data.courses[langIndex];
      const level = course.levels[lvlIndex];
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;

      alert(`Thank you, ${name}! You registered for "${course.language} – ${level.level}".`);
      this.reset();
      document.getElementById('registration-form').style.display = 'none';
    });
  })
  .catch(err => console.error("Error loading courses:", err));
