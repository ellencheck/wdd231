// scripts/main.js
import { courses } from "./data.js";

// Контейнер для карточек
const mainContent = document.getElementById("main-content");

// Создаём карточки
courses.forEach(course => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <h4>${course.name}</h4>
    <p>Level: ${course.level}</p>
    <p>Teacher: ${course.teacher}</p>
    <button class="open-modal">Details</button>
  `;
  mainContent.appendChild(card);

  // Создаём модальное окно для этой карточки
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.innerHTML = `
    <div class="modal-content">
      <span class="modal-close">&times;</span>
      <h2>${course.name}</h2>
      <p>${course.description}</p>
      <p>Teacher: ${course.teacher}</p>
    </div>
  `;
  document.body.appendChild(modal);

  // События открытия и закрытия модалки
  const openBtn = card.querySelector(".open-modal");
  const closeBtn = modal.querySelector(".modal-close");

  openBtn.addEventListener("click", () => {
    modal.style.display = "block";
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });
});

