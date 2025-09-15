// ---------- Погода ----------
const apiKey = 'YOUR_API_KEY'; // вставь свой ключ OpenWeatherMap
const city = 'Seattle'; // замени на город твоей палаты
const apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;

fetch(apiURL)
  .then(response => response.json())
  .then(data => {
    const current = data.list[0];
    const weatherDiv = document.getElementById('weather');
    weatherDiv.innerHTML = `
      <p>Temperature: ${current.main.temp}°F</p>
      <p>Condition: ${current.weather[0].description}</p>
      <h3>3-Day Forecast</h3>
      <ul>
        <li>${data.list[8].dt_txt}: ${data.list[8].main.temp}°F</li>
        <li>${data.list[16].dt_txt}: ${data.list[16].main.temp}°F</li>
        <li>${data.list[24].dt_txt}: ${data.list[24].main.temp}°F</li>
      </ul>
    `;
  });

// ---------- Spotlight компании ----------
fetch('members.json')
  .then(response => response.json())
  .then(data => {
    const spotlights = data.members.filter(m => m.level === 'Gold' || m.level === 'Silver');
    spotlights.sort(() => 0.5 - Math.random());
    const selected = spotlights.slice(0, 3);

    const container = document.getElementById('spotlight-cards');
    selected.forEach(member => {
      const card = document.createElement('div');
      card.className = 'card';
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
  });

// ---------- Динамическая дата в футере ----------
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;
