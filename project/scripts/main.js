// scripts/main.js
document.addEventListener("DOMContentLoaded", () => {
  // Пример простого функционала — отображение года в футере
  const yearSpan = document.querySelector("#current-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Пример адаптивного меню (можно доработать, если нужно)
  const nav = document.querySelector("nav ul");
  const toggleBtn = document.querySelector("#menu-toggle");

  if (toggleBtn && nav) {
    toggleBtn.addEventListener("click", () => {
      nav.classList.toggle("open");
    });
  }
});
