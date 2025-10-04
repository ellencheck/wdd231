document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("teachers-list");
  
  // Если контейнера нет, значит это не страница Teachers → выходим
  if (!container) return;

  try {
    const response = await fetch("data/teachers.json");
    const teachers = await response.json();

    teachers.forEach(teacher => {
      const card = document.createElement("div");
      card.className = "teacher-card";
      card.innerHTML = `
        <img src="${teacher.photo}" alt="${teacher.name}">
        <h3>${teacher.name}</h3>
        <p>${teacher.language}</p>
        <button class="details-btn">Details</button>
      `;
      container.appendChild(card);

      card.querySelector(".details-btn").addEventListener("click", () => {
        document.getElementById("modal-name").textContent = teacher.name;
        document.getElementById("modal-language").textContent = `Language: ${teacher.language}`;
        document.getElementById("modal-education").textContent = `Education: ${teacher.education}`;
        document.getElementById("modal-experience").textContent = `Experience: ${teacher.experience}`;
        document.getElementById("teacher-modal").style.display = "block";
      });
    });
  } catch (err) {
    container.textContent = "Не удалось загрузить преподавателей.";
    console.error(err);
  }

  const modal = document.getElementById("teacher-modal");
  const closeBtn = document.getElementById("close-teacher");

  if (closeBtn) {
    closeBtn.onclick = () => {
      modal.style.display = "none";
    };
  }

  window.onclick = event => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
});
