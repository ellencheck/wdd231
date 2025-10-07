Courses.fetch("data/courses.json")
  .then(response => {
    if (!response.ok) throw new Error("Failed to fetch courses");
    return response.json();
  })
  .then(data => {
    const container = document.getElementById("courses-list");
    const formSelect = document.getElementById("selectedCourse");

    container.innerHTML = "";
    formSelect.innerHTML = "";

    data.courses.forEach((course, langIndex) => {
      course.levels.forEach((level, levelIndex) => {
        const div = document.createElement("div");
        div.className = "course course-card";

        div.innerHTML = `
          <img class="course-image" src="${level.image}" alt="${course.language} – ${level.level}">
          <h3>${course.language} – ${level.level}</h3>
          <p>${level.description}</p>
          <p><strong>Duration:</strong> ${level.duration}</p>
          <p><strong>Price:</strong> ${level.price}</p>
          <button class="details-btn">Details</button>
          <button class="signup-btn">Sign Up</button>
        `;

        // Кнопка "Sign Up"
        div.querySelector(".signup-btn").addEventListener("click", () => openForm(langIndex, levelIndex));

        // Кнопка "Details" (модальное окно)
        div.querySelector(".details-btn").addEventListener("click", () => openModal(course.language, level));

        container.appendChild(div);

        const option = document.createElement("option");
        option.value = `${langIndex}-${levelIndex}`;
        option.textContent = `${course.language} – ${level.level} (${level.price})`;
        formSelect.appendChild(option);
      });
    });

    // Открытие формы регистрации
    window.openForm = (langIndex, levelIndex) => {
      formSelect.value = `${langIndex}-${levelIndex}`;
      const form = document.getElementById("registration-form");
      form.style.display = "block";
      form.scrollIntoView({ behavior: "smooth" });

      // Сохраняем последний выбранный курс в LocalStorage
      localStorage.setItem("lastViewedCourse", JSON.stringify({
        langIndex,
        levelIndex
      }));
    };

    // Отправка формы
    document.getElementById("courseForm").addEventListener("submit", e => {
      e.preventDefault();
      const [langIndex, levelIndex] = formSelect.value.split("-").map(Number);
      const course = data.courses[langIndex].levels[levelIndex];
      const language = data.courses[langIndex].language;
      const name = document.getElementById("name").value;

      alert(`Thank you, ${name}! You registered for "${language} – ${course.level}".`);
      e.target.reset();
      document.getElementById("registration-form").style.display = "none";
    });

    // При загрузке страницы показываем последний выбранный курс (если есть)
    const lastCourse = JSON.parse(localStorage.getItem("lastViewedCourse"));
    if (lastCourse) {
      console.log("Last viewed course:", data.courses[lastCourse.langIndex].language, "-", data.courses[lastCourse.langIndex].levels[lastCourse.levelIndex].level);
    }
  })
  .catch(err => {
    console.error(err);
    document.getElementById("courses-list").innerText = "Failed to load courses.";
  });


// --- Функция модального окна ---
function openModal(language, level) {
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-btn">&times;</span>
      <h2>${language} – ${level.level}</h2>
      <img src="${level.image}" alt="${language} – ${level.level}" style="max-width: 100%; margin-bottom: 1rem;">
      <p>${level.description}</p>
      <p><strong>Duration:</strong> ${level.duration}</p>
      <p><strong>Price:</strong> ${level.price}</p>
    </div>
  `;
  document.body.appendChild(modal);

  // Закрытие по кнопке
  modal.querySelector(".close-btn").addEventListener("click", () => {
    document.body.removeChild(modal);
  });

  // Закрытие при клике вне контента
  modal.addEventListener("click", e => {
    if (e.target === modal) document.body.removeChild(modal);
  });

  // Закрытие по Esc
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && document.body.contains(modal)) {
      document.body.removeChild(modal);
    }
  });
}
