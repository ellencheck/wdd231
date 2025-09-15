// ------------------ Погода ------------------
const apiKey = '1fb64c190e7a26213b3bcfe56a27dc41'; // твой ключ
const city = encodeURIComponent('Villa Alemana,CL'); // город + страна (CL = Chile)
const apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

fetch(apiURL)
  .then(res => {
    if (!res.ok) throw new Error(`Ошибка погоды: ${res.status}`);
    return res.json();
  })
  .then(data => {
    const current = data.list[0];
    const weatherDiv = document.getElementById('weather');

    // Берём 3 прогноза через сутки
    const forecast = [8, 16, 24].map(i => data.list[i]).filter(Boolean);

    weatherDiv.innerHTML = `
      <p><strong>Current Temperature:</strong> ${current.main.temp}°C</p>
      <p><strong>Condition:</strong> ${current.weather[0].description}</p>
      <h3>3-Day Forecast</h3>
      <ul>
        ${forecast.map(f => `
          <li>${new Date(f.dt_txt).toLocaleDateString('en-US')}: 
              ${f.main.temp}°C, ${f.weather[0].description}</li>
        `).join('')}
      </ul>
    `;
  })
  .catch(err => {
    document.getElementById('weather').textContent = "Ошибка загрузки погоды.";
    console.error(err);
  });
