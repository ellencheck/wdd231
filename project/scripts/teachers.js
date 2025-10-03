document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("teachers-list");
  try {
    const response = await fetch("data/teachers.json");
    const teachers = await response.json();
    container.innerHTML = teachers
      .map(t => `<p><strong>${t.name}</strong> — ${t.subject}</p>`)
      .join("");
  } catch (err) {
    container.textContent = "Не удалось загрузить преподавателей.";
  }
});
