function updateWeatherData(response) {
    let cityElement = document.querySelector("#city");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time *1000);
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed");
    let iconElement = document.querySelector("#icon");
    let temperatureElement = document.querySelector("#weather-temperature");
    let currentTemperature = Math.round(response.data.temperature.current);
    
    cityElement.innerHTML = response.data.city;
    timeElement.innerHTML = formatDate(date);
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" alt="" class="weather-icon"/>`;
    temperatureElement.innerHTML = currentTemperature;

    getForecast(response.data.city);
};

function formatDate(date) {
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    let hours = date.getHours();
    let minutes = date.getMinutes();

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return `${day} ${hours}:${minutes}`
};

function searchCity(city) {
    let apiKey = "t9425412e35f60bab5f5aa66fa3o377c";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(updateWeatherData);
};

function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInputElement = document.querySelector("#search-input");

    searchCity(searchInputElement.value);
};

function getForecast(city) {
    let apiKey = "t9425412e35f60bab5f5aa66fa3o377c";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
    
    return days[date.getDay()];
}

function displayForecast(response) {
    let forecastHtml = '';

    for ( let i = 1; i < 6; i++) {
        let day = response.data.daily[i];
        forecastHtml = forecastHtml + `
                <div class="weather-forecast-data">
                    <div class="weather-forecast-day">${formatDay(day.time)}</div>
                    <img class="weather-forecast-icon" src="${day.condition.icon_url}"/>
                    <div class="weather-forecast-temperatures">
                        <div class="weather-forecast-temperature"><strong>${Math.round(day.temperature.maximum)}°</strong></div>
                        <div class="weather-forecast-temperature">${Math.round(day.temperature.minimum)}°</div>
                    </div>
                </div>
            `;
    };

    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHtml;
};

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("London");