fetch('data/courses.json')
  .then(res => {
    if (!res.ok) throw new Error('Failed to fetch courses');
    return res.json();
  })
  .then(data => {
    const container = document.getElementById('courses-list');
    const formSelect = document.getElementById('selectedCourse');

    container.innerHTML = '';
    formSelect.innerHTML = '';

    data.courses.forEach((course, langIndex) => {
      course.levels.forEach((level, levelIndex) => {
        const div = document.createElement('div');
        div.className = 'course';
        div.innerHTML = `
          <h3>${course.flag} ${course.language} – ${level.level}</h3>
          <p>${level.description}</p>
          <p><strong>Duration:</strong> ${level.duration}</p>
          <p><strong>Price:</strong> ${level.price}</p>
          <button>Sign Up</button>
        `;
        div.querySelector('button').addEventListener('click', () => openForm(langIndex, levelIndex));
        container.appendChild(div);

        const option = document.createElement('option');
        option.value = `${langIndex}-${levelIndex}`;
        option.textContent = `${course.language} – ${level.level} (${level.price})`;
        formSelect.appendChild(option);
      });
    });

    window.openForm = (langIndex, levelIndex) => {
      formSelect.value = `${langIndex}-${levelIndex}`;
      const form = document.getElementById('registration-form');
      form.style.display = 'block';
      form.scrollIntoView({ behavior: 'smooth' });
    };

    document.getElementById('courseForm').addEventListener('submit', e => {
      e.preventDefault();
      const [langIndex, levelIndex] = formSelect.value.split('-').map(Number);
      const course = data.courses[langIndex].levels[levelIndex];
      const language = data.courses[langIndex].language;
      const name = document.getElementById('name').value;

      alert(`Thank you, ${name}! You registered for "${language} – ${course.level}".`);
      e.target.reset();
      document.getElementById('registration-form').style.display = 'none';
    });
  })
  .catch(err => {
    console.error(err);
    document.getElementById('courses-list').innerText = "Failed to load courses.";
  });
div.innerHTML = `
  <h3>${course.flag} ${course.language} – ${level.level}</h3>
  <p>${level.description}</p>
  <p><strong>Duration:</strong> ${level.duration}</p>
  <p><strong>Price:</strong> ${level.price}</p>
  <button>Sign Up</button>
`;
