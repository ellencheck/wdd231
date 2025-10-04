document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("teachers-list");

  try {
    const response = await fetch("data/teachers.json");
    const teachers = await response.json();

    teachers.forEach(teacher => {
      const card = document.createElement("div");
      card.className = "teacher-card";

      card.innerHTML = `
        <img src="${teacher.photo}" alt="${teacher.name}" loading="lazy">
        <h3>${teacher.name}</h3>
        <p>${teacher.language} — ${teacher.city}, ${teacher.country}</p>
        <p>${teacher.bio}</p>
      `;

      container.appendChild(card);
    });

  } catch (err) {
    container.textContent = "Не удалось загрузить преподавателей.";
    console.error(err);
  }
});
