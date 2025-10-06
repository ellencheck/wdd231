// main.js
import { getData } from './data.js';

const container = document.querySelector('#courses-container');
const modal = document.querySelector('#modal');
const modalContent = document.querySelector('#modal-content');
const modalClose = document.querySelector('#modal-close');

// Функция отображения данных
async function displayCourses() {
  try {
    const data = await getData();
    
    // Динамически создаём карточки
    data.forEach(item => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <p>Цена: ${item.price}</p>
        <img src="${item.image}" alt="${item.name}" loading="lazy">
      `;
      container.appendChild(card);

      // Клик на карточку открывает модальное окно
      card.addEventListener('click', () => {
        modalContent.innerHTML = `
          <h2>${item.name}</h2>
          <p>${item.fullDescription}</p>
        `;
        modal.style.display = 'block';
        // Сохраняем последний выбранный курс в LocalStorage
        localStorage.setItem('lastCourse', item.name);
      });
    });

  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
  }
}

// Закрытие модального окна
modalClose.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Запуск функции
displayCourses();

// Опционально: показать последний выбранный курс при загрузке
const lastCourse = localStorage.getItem('lastCourse');
if(lastCourse) {
  console.log('Последний выбранный курс:', lastCourse);
}
