let coursesData = []; // глобально для доступа в делегаторе

// Загрузка курсов
fetch("data/courses.json")
  .then(res => {
    if (!res.ok) throw new Error("Failed to fetch courses");
    return res.json();
  })
  .then(data => {
    coursesData = data.courses;
    const container = document.getElementById("courses-list");
    const formSelect = document.getElementById("selectedCourse");

    container.innerHTML = "";
    formSelect.innerHTML = "";

    // Создание карточек
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

    // Делегирование кликов
    container.addEventListener("click", (e) => {
      const card = e.target.closest(".course-card");
      if (!card) return;

      const langIndex = parseInt(card.dataset.langIndex);
      const levelIndex = parseInt(card.dataset.levelIndex);

      if (e.target.classList.contains("details-btn")) {
        const level = coursesData[langIndex].levels[levelIndex];
        const language = coursesData[langIndex].language;
        openModal(language, level);
      }

      if (e.target.classList.contains("signup-btn")) {
        openForm(langIndex, levelIndex);
      }
    });
  })
  .catch(err => {
    console.error(err);
    document.getElementById("courses-list").innerText = "Failed to load courses.";
  });

// --- Функция открытия формы регистрации ---
function openForm(langIndex, levelIndex) {
  const formSelect = document.getElementById("selectedCourse");
  formSelect.value = `${langIndex}-${levelIndex}`;
  const form = document.getElementById("registration-form");
  form.style.display = "block";
  form.scrollIntoView({ behavior: "smooth" });

  localStorage.setItem("lastViewedCourse", JSON.stringify({ langIndex, levelIndex }));
}

// --- Форма отправки ---
document.getElementById("courseForm").addEventListener("submit", e => {
  e.preventDefault();
  const formSelect = document.getElementById("selectedCourse");
  const [langIndex, levelIndex] = formSelect.value.split("-").map(Number);
  const course = coursesData[langIndex].levels[levelIndex];
  const language = coursesData[langIndex].language;
  const name = document.getElementById("name").value;

  alert(`Thank you, ${name}! You registered for "${language} – ${course.level}".`);
  e.target.reset();
  document.getElementById("registration-form").style.display = "none";
});

// --- Модальное окно ---
function openModal(language, level) {
  // Удаляем старое окно, если есть
  const oldModal = document.querySelector(".modal");
  if (oldModal) oldModal.remove();

  const modal = document.createElement("div");
  modal.className = "modal";
  modal.style = `
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0,0,0,0.6);
    display: flex; justify-content: center; align-items: center;
    z-index: 1000;
  `;

  modal.innerHTML = `
    <div class="modal-content" style="
      background: #fff; padding: 20px; border-radius: 10px; max-width: 500px; width: 90%;
      position: relative; animation: fadeIn 0.3s;
    ">
      <span class="close-btn" style="
        position: absolute; top: 10px; right: 15px; cursor: pointer; font-size: 24px;
      ">&times;</span>
      <h2>${language} – ${level.level}</h2>
      <img src="${level.image}" alt="${language} – ${level.level}" style="max-width: 100%; margin-bottom: 1rem;">
      <p>${level.description}</p>
      <p><strong>Duration:</strong> ${level.duration}</p>
      <p><strong>Price:</strong> ${level.price}</p>
    </div>
  `;

  document.body.appendChild(modal);

  const closeModal = () => modal.remove();

  modal.querySelector(".close-btn").addEventListener("click", closeModal);
  modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });
}
