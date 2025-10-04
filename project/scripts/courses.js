fetch("data/courses.json")
  .then(response => {
    if (!response.ok) throw new Error("Failed to fetch courses");
    return response.json();
  })
  .then(data => {
    const container = document.getElementById("courses-list");
    const formSelect = document.getElementById("selectedCourse");

    container.innerHTML = "";
    formSelect.innerHTML = "";

    const flagEmojis = {
      "Russian": "🇷🇺",
      "English": "🇬🇧",
      "Spanish": "🇪🇸",
      "French": "🇫🇷",
      "German": "🇩🇪",
      "Italian": "🇮🇹",
      "Japanese": "🇯🇵",
      "Chinese": "🇨🇳",
      "Portuguese": "🇵🇹",
      "Arabic": "🇸🇦"
    };

    data.courses.forEach((course, langIndex) => {
      const emojiFlag = flagEmojis[course.language] || "🏳️";

      course.levels.forEach((level, levelIndex) => {
        const div = document.createElement("div");
        div.className = "course-card"; // используем твой CSS класс

        div.innerHTML = `
          <img src="${level.image}" alt="${course.language} – ${level.level}">
          <h3><span class="flag-emoji">${emojiFlag}</span> ${course.language} – ${level.level}</h3>
          <p>${level.description}</p>
          <p><strong>Duration:</strong> ${level.duration}</p>
          <p><strong>Price:</strong> ${level.price}</p>
          <button>Sign Up</button>
        `;

        // открытие формы при клике
        div.querySelector("button").addEventListener("click", () => openForm(langIndex, levelIndex));

        container.appendChild(div);

        // добавление в select
        const option = document.createElement("option");
        option.value = `${langIndex}-${levelIndex}`;
        option.textContent = `${course.language} – ${level.level} (${level.price})`;
        formSelect.appendChild(option);
      });
    });

    // функция открытия формы
    window.openForm = (langIndex, levelIndex) => {
      formSelect.value = `${langIndex}-${levelIndex}`;
      const form = document.getElementById("registration-form");
      form.style.display = "block";
      form.scrollIntoView({ behavior: "smooth" });
    };

    // отправка формы
    document.getElementById("courseForm").addEventListener("submit", e => {
      e.preventDefault();
      const [langIndex, levelIndex] = formSelect.value.split("-").map(Number);
      const course = data.courses[langIndex].levels[levelIndex];
      const language = data.courses[langIndex].language;
      const name = document.getElementById("name").value;

      alert(`Thank you, ${name}! You registered for "${language} – ${course.level}".`);
      e.target.reset();
      document.getElementById("registration-form").style.display = "none";
    });
  })
  .catch(err => {
    console.error(err);
    document.getElementById("courses-list").innerText = "Failed to load courses.";
  });

