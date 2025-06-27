const apiKey = "MYJVWHRL38UKVH945KJ6N8ME9";


function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) return alert("Please enter a city name.");

  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(city)}?unitGroup=metric&key=${apiKey}&include=current`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const current = data.currentConditions;

      const output = `
        <h2>${data.resolvedAddress}</h2>
        <p><strong>Conditions:</strong> ${current.conditions}</p>
        <p><strong>Temperature:</strong> ${current.temp} °C</p>
        <p><strong>Feels Like:</strong> ${current.feelslike} °C</p>
        <p><strong>Humidity:</strong> ${current.humidity}%</p>
        <p><strong>Wind:</strong> ${current.windspeed} km/h</p>
        <p><strong>Cloud Cover:</strong> ${current.cloudcover}%</p>
      `;

      document.getElementById("weatherResult").innerHTML = output;
    })
    .catch(error => {
      console.error("Weather fetch failed:", error);
      document.getElementById("weatherResult").innerHTML = "❌ Error fetching weather data.";
    });

    
logCitySearch(city);

function logCitySearch(cityName) {
  fetch("log.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "city=" + encodeURIComponent(cityName)
  })
  .then(res => res.text())
  .then(data => console.log("Log:", data))
  .catch(err => console.error("Log error:", err));
}

}


