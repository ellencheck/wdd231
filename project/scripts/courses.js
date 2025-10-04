// Данные курсов с кодами стран для flag-icons
const data = {
  courses: [
    { language: "Russian", flag: "ru", levels: [
        { level: "Beginner (A1)", duration: "4 months", price: "$400", description: "Start learning Russian with the basics of grammar, vocabulary, and pronunciation." },
        { level: "Elementary (A2)", duration: "5 months", price: "$500", description: "Build on basic knowledge to handle simple communication." },
        { level: "Intermediate (B1)", duration: "6 months", price: "$600", description: "Develop confidence in Russian communication through practical conversation with native speakers." },
        { level: "Upper Intermediate (B2)", duration: "7 months", price: "$700", description: "Enhance fluency and comprehension in various contexts." },
        { level: "Advanced (C1)", duration: "8 months", price: "$800", description: "Achieve advanced Russian fluency for academic, professional, or cultural purposes." },
        { level: "Proficient (C2)", duration: "10 months", price: "$1000", description: "Achieve full mastery of Russian with native-level speaking, writing, and comprehension." }
      ]
    },
    { language: "English", flag: "gb", levels: [
        { level: "Beginner (A1)", duration: "4 months", price: "$400", description: "Learn essential English grammar and vocabulary for everyday situations." },
        { level: "Elementary (A2)", duration: "5 months", price: "$500", description: "Build on basic knowledge to handle simple communication." },
        { level: "Intermediate (B1)", duration: "6 months", price: "$600", description: "Improve fluency and accuracy in English through interactive practice." },
        { level: "Upper Intermediate (B2)", duration: "7 months", price: "$700", description: "Enhance fluency and comprehension in various contexts." },
        { level: "Advanced (C1)", duration: "8 months", price: "$800", description: "Develop strong academic and professional English communication skills." },
        { level: "Proficient (C2)", duration: "10 months", price: "$1000", description: "Reach native-like English proficiency for any context." }
      ]
    },
    // ...другие языки
  ]
};

// Контейнер и select
const container = document.getElementById('courses-list');
const formSelect = document.getElementById('selectedCourse');

// Генерация списка курсов
data.courses.forEach((course, langIndex) => {
  course.levels.forEach((level, lvlIndex) => {
    const courseDiv = document.createElement('div');
    courseDiv.className = 'course';
    courseDiv.innerHTML = `
      <h3><span class="fi fi-${course.flag}"></span> ${course.language} – ${level.level}</h3>
      <p>${level.description}</p>
      <p><strong>Duration:</strong> ${level.duration}</p>
      <p><strong>Price:</strong> ${level.price}</p>
      <button type="button" class="register-btn">Sign Up</button>
    `;
    container.appendChild(courseDiv);

    // Кнопка регистрации
    const btn = courseDiv.querySelector('.register-btn');
    btn.addEventListener('click', () => openForm(langIndex, lvlIndex));

    // Добавляем опцию в select
    const option = document.createElement('option');
    option.value = `${langIndex}-${lvlIndex}`;
    option.textContent = `${course.language} – ${level.level} (${level.price})`;
    formSelect.appendChild(option);
  });
});

// Функция открытия формы
function openForm(langIndex, lvlIndex) {
  formSelect.value = `${langIndex}-${lvlIndex}`;
  const form = document.getElementById('registration-form');
  form.style.display = 'block';
  form.scrollIntoView({ behavior: 'smooth' });
}

// Отправка формы
document.getElementById('courseForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const [langIndex, lvlIndex] = formSelect.value.split('-').map(Number);
  const course = data.courses[langIndex];
  const level = course.levels[lvlIndex];
  const name = document.getElementById('name').value;

  alert(`Thank you, ${name}! You registered for "${course.language} – ${level.level}".`);
  this.reset();
  document.getElementById('registration-form').style.display = 'none';
});
