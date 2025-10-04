fetch('/wdd231/data/courses.json')
  .then(response => {
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  })
  .then(data => {
    const container = document.getElementById('courses-list');
    const formSelect = document.getElementById('selectedCourse');

    // Отображаем курсы
    container.innerHTML = data.courses.map((c, langIndex) => {
      return c.levels.map((level, levelIndex) => `
        <div class="course">
          <h3>${c.flag} ${c.language} – ${level.level}</h3>
          <p>${level.description}</p>
          <p><strong>Duration:</strong> ${level.duration}</p>
          <p><strong>Price:</strong> ${level.price}</p>
          <button onclick="openForm(${langIndex}, ${levelIndex})">Sign Up</button>
        </div>
      `).join('');
    }).join('');

    // Заполняем select формы
    data.courses.forEach((c, langIndex) => {
      c.levels.forEach((level, levelIndex) => {
        const option = document.createElement('option');
        option.value = `${langIndex}-${levelIndex}`;
        option.textContent = `${c.flag} ${c.language} – ${level.level} (${level.price})`;
        formSelect.appendChild(option);
      });
    });

    // Форма: открытие по кнопке
    window.openForm = function(langIndex, levelIndex) {
      formSelect.value = `${langIndex}-${levelIndex}`;
      document.getElementById('registration-form').style.display = 'block';
      document.getElementById('registration-form').scrollIntoView({behavior: "smooth"});
    };

    // Отправка формы
    document.getElementById('courseForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const [langIndex, levelIndex] = formSelect.value.split('-').map(Number);
      const course = data.courses[langIndex].levels[levelIndex];
      const language = data.courses[langIndex].language;
      const flag = data.courses[langIndex].flag;
      const name = document.getElementById('name').value;

      alert(`Thank you, ${name}! You registered for "${flag} ${language} – ${course.level}".`);
      this.reset();
      document.getElementById('registration-form').style.display = 'none';
    });
  })
  .catch(err => {
    console.error("Error loading courses:", err);
    document.getElementById('courses-list').textContent = "Failed to load courses.";
  });
