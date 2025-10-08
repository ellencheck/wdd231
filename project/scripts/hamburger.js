// scripts/hamburger.js

// Находим кнопку и меню
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('nav ul');

if (hamburger && navMenu) {
  // Когда нажимаем на кнопку — переключаем меню
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('show-menu');
  });
}
