document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("teachers-list");

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

  document.getElementById("close-teacher").onclick = () => {
    document.getElementById("teacher-modal").style.display = "none";
  };

  window.onclick = event => {
    if (event.target === document.getElementById("teacher-modal")) {
      document.getElementById("teacher-modal").style.display = "none";
    }
  };
});
