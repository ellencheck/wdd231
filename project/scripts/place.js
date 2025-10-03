// scripts/place.js
// Скрипт пытается найти рабочий файл изображения в нескольких папках (data/courses, date/teachers, images).
// Он выбирает маленький вариант для узких экранов и большой для больших экранов.
// Если ваши имена файлов отличаются — поправьте массив filenamesSmall / filenamesLarge.

document.addEventListener('DOMContentLoaded', () => {
  const heroImg = document.getElementById('hero-img');

  // Возможные папки (в порядке приоритета)
  const folders = [
    'data/courses/',
    'date/teachers/',
    'images/',
    '' // резервный — корень
  ];

  // имена тестовых файлов — вы можете поменять на свои
  const filenamesSmall = ['chile-hero-small.webp','chile-hero-small.jpg','chile-hero-small.png'];
  const filenamesLarge = ['chile-hero-large.webp','chile-hero-large.jpg','chile-hero-large.png'];

  // выбрать набор по медиазапросу
  const isSmallScreen = window.matchMedia('(max-width: 720px)').matches;
  const preferredList = isSmallScreen ? filenamesSmall : filenamesLarge;
  const fallbackList = isSmallScreen ? filenamesLarge : filenamesSmall;

  // пробует загрузить комбинации folder + filename по очереди
  function tryPaths(list, folders, onFound, onAllFailed){
    let tried = 0;
    let done = false;

    for (const folder of folders){
      for (const name of list){
        const path = folder + name;
        const img = new Image();
        img.onload = () => {
          if (done) return;
          done = true;
          onFound(path);
        };
        img.onerror = () => {
          tried++;
          if (tried >= folders.length * list.length && !done){
            onAllFailed();
          }
        };
        // инициируем загрузку (не добавляем в DOM)
        img.src = path;
      }
    }
  }

  // сначала пробуем preferred, затем fallback
  tryPaths(preferredList, folders, (goodPath) => {
    heroImg.src = goodPath;
  }, () => {
    // preferred не найден — пробуем fallback
    tryPaths(fallbackList, folders, (goodPath) => {
      heroImg.src = goodPath;
    }, () => {
      // ничего не найдено — показываем заглушку (цвет/фон)
      heroImg.alt = "Тестовое изображение не найдено. Положите файл в data/courses/ с именем chile-hero-small.webp или chile-hero-large.webp";
      // можно дополнительно установить placeholder
      heroImg.style.background = '#bbb';
      heroImg.style.minHeight = '240px';
    });
  });

  // Обновление при изменении размера экрана: выбираем другой файл (мелкий/большой)
  let mq = window.matchMedia('(max-width: 720px)');
  mq.addEventListener('change', () => {
    // перезапуск поиска (можно оптимизировать, но для теста ок)
    // сначала очистим src, чтобы показать обновление
    heroImg.removeAttribute('src');
    const preferred = mq.matches ? filenamesSmall : filenamesLarge;
    const fallback = mq.matches ? filenamesLarge : filenamesSmall;
    tryPaths(preferred, folders, (goodPath) => {
      heroImg.src = goodPath;
    }, () => {
      tryPaths(fallback, folders, (goodPath) => {
        heroImg.src = goodPath;
      }, () => {/* ничего */});
    });
  });
});
