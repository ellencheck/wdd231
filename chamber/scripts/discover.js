document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("discover-grid");
  const visitMsg = document.getElementById("visit-message");
  const DATA_PATH = "data/discover.json";

  // Функция для показа сообщения последнего визита
  function showVisitMessage() {
    const last = localStorage.getItem("lastVisit");
    const now = Date.now();

    if (!last) {
      visitMsg.textContent = "Welcome! Let us know if you have any questions.";
    } else {
      const diffMs = now - Number(last);
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      if (diffDays < 1) {
        visitMsg.textContent = "Back so soon! Awesome!";
      } else if (diffDays === 1) {
        visitMsg.textContent = "You last visited 1 day ago.";
      } else {
        visitMsg.textContent = `You last visited ${diffDays} days ago.`;
      }
    }
    localStorage.setItem("lastVisit", now);
  }

  // Загрузить JSON и отрисовать карточки
  fetch(DATA_PATH)
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      data.forEach(item => {
        const article = document.createElement("article");
        article.classList.add("card");

        const h2 = document.createElement("h2");
        h2.textContent = item.title;

        const figure = document.createElement("figure");
        const img = document.createElement("img");
        img.src = item.image;
        img.alt = item.title;
        figure.appendChild(img);

        const addr = document.createElement("address");
        addr.textContent = item.address;

        const p = document.createElement("p");
        p.textContent = item.description;

        const btn = document.createElement("button");
        btn.textContent = "Learn More";

        article.append(h2, figure, addr, p, btn);
        grid.appendChild(article);
      });
    })
    .catch(error => {
      console.error("Error loading JSON:", error);
      grid.textContent = "Could not load data at this time.";
    });

  showVisitMessage();
});
document.addEventListener("DOMContentLoaded", () => {
  // ------------------ Footer Year ------------------
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // ------------------ Footer Last Modified ------------------
  const lastModifiedSpan = document.getElementById("lastModified");
  if (lastModifiedSpan) {
    // Используем document.lastModified, но если пусто, ставим текущее время
    const lastModifiedRaw = document.lastModified || new Date().toISOString();
    const lastModified = new Date(lastModifiedRaw);

    if (!isNaN(lastModified)) {
      const formattedDate = `${String(lastModified.getMonth() + 1).padStart(2, "0")}/` +
                            `${String(lastModified.getDate()).padStart(2, "0")}/` +
                            `${lastModified.getFullYear()} ` +
                            `${String(lastModified.getHours()).padStart(2, "0")}:` +
                            `${String(lastModified.getMinutes()).padStart(2, "0")}:` +
                            `${String(lastModified.getSeconds()).padStart(2, "0")}`;
      lastModifiedSpan.textContent = formattedDate;
    } else {
      // На случай, если дата невалидная
      lastModifiedSpan.textContent = "Unknown";
    }
  }

  // ------------------ Mobile Menu ------------------
  const menuBtn = document.querySelector("#menu");
  const navUl = document.querySelector(".navigation");

  if (menuBtn && navUl) {
    menuBtn.addEventListener("click", () => {
      navUl.classList.toggle("show");
    });
  }
});
