let coursesData = []; // глобально сохраняем данные для доступа в делегаторе

fetch("data/courses.json")
  .then(res => res.json())
  .then(data => {
    coursesData = data.courses; // сохраняем для делегирования
    const container = document.getElementById("courses-list");
    const formSelect = document.getElementById("selectedCourse");

    container.innerHTML = "";
    formSelect.innerHTML = "";

    data.courses.forEach((course, langIndex) => {
      course.levels.forEach((level, levelIndex) => {
        const div = document.createElement("div");
        div.className = "course course-card";
        div.dataset.langIndex = langIndex;
        div.dataset.levelIndex = levelIndex;

        div.innerHTML = `
          <img class="course-image" src="${level.image}" alt="${course.language} – ${level.level}">
          <h3>${course.language} – ${level.level}</h3>
          <p>${level.description}</p>
          <p><strong>Duration:</strong> ${level.duration}</p>
          <p><strong>Price:</strong> ${level.price}</p>
          <button class="details-btn">Details</button>
          <button class="signup-btn">Sign Up</button>
        `;

        container.appendChild(div);

        const option = document.createElement("option");
        option.value = `${langIndex}-${levelIndex}`;
        option.textContent = `${course.language} – ${level.level} (${level.price})`;
        formSelect.appendChild(option);
      });
    });

    // делегируем клики по кнопкам
    container.addEventListener("click", (e) => {
      const card = e.target.closest(".course-card");
      if (!card) return;

      const langIndex = card.dataset.langIndex;
      const levelIndex = card.dataset.levelIndex;

      if (e.target.classList.contains("details-btn")) {
        const level = coursesData[langIndex].levels[levelIndex];
        const language = coursesData[langIndex].language;
        openModal(language, level);
      }

      if (e.target.classList.contains("signup-btn")) {
        openForm(parseInt(langIndex), parseInt(levelIndex));
      }
    });
  });
