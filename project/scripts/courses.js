// ==== Данные курсов прямо в JS (не fetch) ====
const data = {
  "courses": [
    {
      "language": "Russian",
      "flag": "🇷🇺",
      "levels": [
        { "level": "Beginner (A1)", "duration": "4 months", "price": "$400", "description": "Start learning Russian with basics." },
        { "level": "Elementary (A2)", "duration": "5 months", "price": "$500", "description": "Build basic communication skills." }
      ]
    },
    {
      "language": "English",
      "flag": "🇬🇧",
      "levels": [
        { "level": "Beginner (A1)", "duration": "4 months", "price": "$400", "description": "Learn basic English grammar and vocabulary." },
        { "level": "Intermediate (B1)", "duration": "6 months", "price": "$600", "description": "Improve fluency and accuracy." }
      ]
    }
  ]
};

const container = document.getElementById('courses-list');
const formSelect = document.getElementById('selectedCourse');

// ==== Отображение курсов ====
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

// ==== Заполнение select формы ====
data.courses.forEach((c, langIndex) => {
  c.levels.forEach((level, levelIndex) => {
    const option = document.createElement('option');
    option.value = `${langIndex}-${levelIndex}`;
    option.textContent = `${c.flag} ${c.language} – ${level.level} (${level.price})`;
    formSelect.appendChild(option);
  });
});

// ==== Форма: открытие ====
window.openForm = function(langIndex, levelIndex) {
  formSelect.value = `${langIndex}-${levelIndex}`;
  document.getElementById('registration-form').style.display = 'block';
  document.getElementById('registration-form').scrollIntoView({behavior: "smooth"});
};

// ==== Отправка формы ====
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
