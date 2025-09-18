// ------------------ Погода ------------------
const apiKey = "1fb64c190e7a26213b3bcfe56a27dc41"; // твой ключ OpenWeatherMap
const city = encodeURIComponent("Villa Alemana,CL");
const apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

fetch(apiURL)
  .then(res => {
    if (!res.ok) throw new Error(`Ошибка погоды: ${res.status}`);
    return res.json();
  })
  .then(data => {
    const current = data.list[0];
    const weatherDiv = document.getElementById("weather");

    const forecast = [data.list[8], data.list[16], data.list[24]];

    weatherDiv.innerHTML = `
      <p><strong>Current Temperature:</strong> ${current.main.temp}°C</p>
      <p><strong>Condition:</strong> ${current.weather[0].description}</p>
      <h3>3-Day Forecast</h3>
      <ul>
        ${forecast
          .map(
            f =>
              `<li>${new Date(f.dt_txt).toLocaleDateString("en-US")}: ${f.main.temp}°C, ${f.weather[0].description}</li>`
          )
          .join("")}
      </ul>
    `;
  })
  .catch(err => console.error(err));

// ------------------ Spotlight компании ------------------
fetch("data/members.json")
  .then(res => res.json())
  .then(data => {
    const spotlights = data.members.filter(
      m => m.level === "Gold" || m.level === "Silver"
    );
    spotlights.sort(() => 0.5 - Math.random());
    const selected = spotlights.slice(0, 3);

    const container = document.getElementById("spotlight-cards");
    selected.forEach(member => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h3>${member.name}</h3>
        <img src="${member.logo}" alt="${member.name} Logo">
        <p>${member.phone}</p>
        <p>${member.address}</p>
        <p><a href="${member.website}" target="_blank">Website</a></p>
        <p>Member Level: ${member.level}</p>
      `;
      container.appendChild(card);
    });
  })
  .catch(err => console.error("Ошибка spotlight:", err));

// ------------------ Footer ------------------
document.getElementById("year").textContent = new Date().getFullYear();

// Формат даты: MM/DD/YYYY HH:MM:SS
const lastModified = new Date(document.lastModified);
const formattedDate = `${String(lastModified.getMonth() + 1).padStart(2, "0")}/` +
                      `${String(lastModified.getDate()).padStart(2, "0")}/` +
                      `${lastModified.getFullYear()} ` +
                      `${String(lastModified.getHours()).padStart(2, "0")}:` +
                      `${String(lastModified.getMinutes()).padStart(2, "0")}:` +
                      `${String(lastModified.getSeconds()).padStart(2, "0")}`;

document.getElementById("lastModified").textContent = formattedDate;

// ------------------ Меню ------------------
const menuBtn = document.querySelector("#menu");
const navUl = document.querySelector(".navigation");

menuBtn.addEventListener("click", () => {
  navUl.classList.toggle("show");
});
