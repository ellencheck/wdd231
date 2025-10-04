// scripts/courses.js
fetch('data/courses.json')
  .then(response => {
    if (!response.ok) throw new Error("Failed to load courses.json");
    return response.json();
  })
  .then(data => {
    const container = document.getElementById('courses-list');
    const formSelect = document.getElementById('selectedCourse');

    // 1️⃣ Отображаем курсы
    let html = '';
    data.courses.forEach((c, langIndex) => {
      c.levels.forEach((level, levelIndex) => {
        html += `
          <div class="course">
            <h3>${c.flag} ${c.language} – ${level.level}</h3>
            <p>${level.description}</p>
            <p><strong>Duration:</strong> ${level.duration}</p>
            <p><strong>Price:</strong> ${level.price}</p>
            <button onclick="openForm(${langIndex}, ${levelIndex})">Sign Up</button>
          </div>
        `;
      });
    });
    container.innerHTML = html;

    // 2️⃣ Заполняем select формы
    data.courses.forEach((c, langIndex) => {
      c.levels.forEach((level, levelIndex) => {
        const option = document.createElement('option');
        option.value = `${langIndex}-${levelIndex}`;
        option.textContent = `${c.flag} ${c.language} – ${level.level} (${level.price})`;
        formSelect.appendChild(option);
      });
    });

    // 3️⃣ Открытие формы по кнопке
    window.openForm = function(langIndex, levelIndex) {
      formSelect.value = `${langIndex}-${levelIndex}`;
      document.getElementById('registration-form').style.display = 'block';
      document.getElementById('registration-form').scrollIntoView({behavior: "smooth"});
    };

    // 4️⃣ Отправка формы
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
  .catch(err => console.error("Error loading courses:", err));
