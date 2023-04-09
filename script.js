const city = 'Besalma';
const apiKey = '4b1df8531349a7b7dd4b6d88c9c6e1a3';

const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

$(document).ready(function() {
  $.ajax({
    url: weatherUrl,
    type: 'GET',
    dataType: 'jsonp',
    success: function(data) {
      const weather = {
        temp: Math.round(data.main.temp),
        wind: Math.round(data.wind.speed),
        humidity: data.main.humidity,
        pressure: data.main.pressure
      };

      displayWeather(weather);
    },
    error: function(err) {
      console.log('Error:', err);
    }
  });
});

function displayWeather(weather) {
  const weatherDiv = $('#weather');
  const tempEmoji = getTempEmoji(weather.temp);
  const windEmoji = getWindEmoji(weather.wind);
  const humidityEmoji = getHumidityEmoji(weather.humidity);
  const pressureEmoji = getPressureEmoji(weather.pressure);

  weatherDiv.html(`
    <h1>Погода в ${city}</h1>
    <p>Температура: <strong>${weather.temp}°C</strong> ${tempEmoji}</p>
    <p>Ветер: <strong>${weather.wind} м/с</strong> ${windEmoji}</p>
    <p>Влажность: <strong>${weather.humidity}%</strong> ${humidityEmoji}</p>
    <p>Давление: <strong>${weather.pressure} гПа</strong> ${pressureEmoji}</p>
  `);
}

function getTempEmoji(temp) {
  if (temp < 0) {
    return '❄️';
  } else {
    return '☀️';
  }
}

function getWindEmoji(wind) {
  if (wind < 3) {
    return '🍃';
  } else if (wind < 6) {
    return '🌬️';
  } else if (wind < 10) {
    return '💨';
  } else {
    return '🌪️';
  }
}

function getHumidityEmoji(humidity) {
  if (humidity < 30) {
    return '🏜️';
  } else if (humidity < 60) {
    return '🌳';
  } else {
    return '🌊';
  }
}

function getPressureEmoji(pressure) {
  if (pressure < 1000) {
    return '🌀';
  } else if (pressure < 1015) {
    return '🌡️';
  } else if (pressure < 1030) {
    return '🔵';
  } else {
    return '🔴';
  }
}