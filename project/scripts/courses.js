document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("courses-list");
  try {
    const response = await fetch("data/courses.json");
    const courses = await response.json();
    container.innerHTML = courses
      .map(c => `<p><strong>${c.name}</strong> — ${c.description}</p>`)
      .join("");
  } catch (err) {
    container.textContent = "Не удалось загрузить курсы.";
  }
});
