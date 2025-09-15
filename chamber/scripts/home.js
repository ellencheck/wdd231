// ------------------ Погода ------------------
const apiKey = '2a3b4c5d6e7f8g9h0i1j2k3l4m5n6o7'; // твой ключ
const city = encodeURIComponent('Viña del Mar,CL'); // кодировка города
const apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

fetch(apiURL)
  .then(res => {
    if (!res.ok) throw new Error(`Ошибка погоды: ${res.status}`);
    return res.json();
  })
  .then(data => {
    const current = data.list[0];
    const weatherDiv = document.getElementById('weather');

    // Берём три ближайших прогноза через 8 интервалов (каждые 3 часа → 8*3=24 часа)
    const forecast = [
      data.list[8],
      data.list[16],
      data.list[24]
    ];

    weatherDiv.innerHTML = `
      <p><strong>Current Temperature:</strong> ${current.main.temp}°C</p>
      <p><strong>Condition:</strong> ${current.weather[0].description}</p>
      <h3>3-Day Forecast</h3>
      <ul>
        ${forecast.map(f => `<li>${new Date(f.dt_txt).toLocaleDateString('en-US')}: ${f.main.temp}°C, ${f.weather[0].description}</li>`).join('')}
      </ul>
    `;
  })
  .catch(err => console.error(err));

// ------------------ Spotlight компании ------------------
fetch('members.json')
  .then(res => res.json())
  .then(data => {
    const spotlights = data.members.filter(m => m.level === 'Gold' || m.level === 'Silver');
    spotlights.sort(() => 0.5 - Math.random()); // перемешать
    const selected = spotlights.slice(0, 3); // выбрать 3 случайные

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
  })
  .catch(err => console.error('Ошибка spotlight:', err));

// ------------------ Динамическая дата в футере ------------------
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;
