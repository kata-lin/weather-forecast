function updateWeatherData(response) {
    let temperatureElement = document.querySelector("#weather-temperature");
    let currentTemperature = Math.round(response.data.temperature.current);
    let cityElement = document.querySelector("#city");
    
    cityElement.innerHTML = response.data.city;
    temperatureElement.innerHTML = currentTemperature;
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

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("London");