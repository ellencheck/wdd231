fetch('data/courses.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('courses-list');
    const formSelect = document.getElementById('selectedCourse');

    container.innerHTML = ''; // чистим контейнер

    data.courses.forEach((c, langIndex) => {
      c.levels.forEach((level, levelIndex) => {
        // создаём карточку курса
        const div = document.createElement('div');
        div.className = 'course';
        div.innerHTML = `
          <h3>${c.flag} ${c.language} – ${level.level}</h3>
          <p>${level.description}</p>
          <p><strong>Duration:</strong> ${level.duration}</p>
          <p><strong>Price:</strong> ${level.price}</p>
          <button>Sign Up</button>
        `;
        const btn = div.querySelector('button');
        btn.addEventListener('click', () => openForm(langIndex, levelIndex));
        container.appendChild(div);

        // добавляем в select
        const option = document.createElement('option');
        option.value = `${langIndex}-${levelIndex}`;
        option.textContent = `${c.flag} ${c.language} – ${level.level} (${level.price})`;
        formSelect.appendChild(option);
      });
    });

    window.openForm = (langIndex, levelIndex) => {
      formSelect.value = `${langIndex}-${levelIndex}`;
      document.getElementById('registration-form').style.display = 'block';
      document.getElementById('registration-form').scrollIntoView({ behavior: 'smooth' });
    };

    document.getElementById('courseForm').addEventListener('submit', e => {
      e.preventDefault();
      const [langIndex, levelIndex] = formSelect.value.split('-').map(Number);
      const course = data.courses[langIndex].levels[levelIndex];
      const language = data.courses[langIndex].language;
      const flag = data.courses[langIndex].flag;
      const name = document.getElementById('name').value;

      alert(`Thank you, ${name}! You registered for "${flag} ${language} – ${course.level}".`);
      e.target.reset();
      document.getElementById('registration-form').style.display = 'none';
    });
  })
  .catch(err => {
    console.error('Error loading courses:', err);
    document.getElementById('courses-list').textContent = 'Failed to load courses.';
  });
