document.addEventListener("DOMContentLoaded", function() {
    fetchWeatherData("New York");
    document.getElementById("searchButton").addEventListener("click", function() {
        searchWeather();
    });

    function fetchWeatherData(location) {
        const apiKey = "767cf4f7e02ee1276b69c7c59ebd5a74";
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${location}&appid=${apiKey}`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    alert("Please enter a correct location.");
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                displayWeather(data);
                setBackground(data.weather[0].main); 
            })
            .catch(error => {
                console.error("There was a problem fetching the weather data:", error);
            });
    }

    function displayWeather(data) {
        const weatherInfo = document.getElementById("weather-info");
        weatherInfo.innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <p class="temp">${data.main.temp}°C</p>
            <p class="humidity">${data.main.humidity}% Humidity</p>
            <p class="wind">${data.wind.speed} km/h Wind Speed</p>
        `;
    }

    function setBackground(weatherCondition) {
        const body = document.querySelector("body");
        switch (weatherCondition) {
            case "Clear":
                body.style.backgroundImage = "url('images/clear.jpg')";
                break;
            case "Clouds":
                body.style.backgroundImage = "url('images/cloudy-weather.jpg')";
                break;
            case "Rain":
            case "Drizzle":
            case "Thunderstorm":
                body.style.backgroundImage = "url('images/rainy.jpg')";
                break;
            case "Snow":
                body.style.backgroundImage = "url('images/snow.jpg')";
                break;
            default:
                
                break;
        }
    }

    function searchWeather() {
        const searchInput = document.getElementById("searchInput").value;
        if (searchInput.trim() !== "") {
            fetchWeatherData(searchInput);
        } else {
            alert("Please enter a location.");
        }
    }
});
