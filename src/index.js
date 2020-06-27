let now = new Date();
let h2 = document.querySelector("h2");

let date = now.getDate();
let year = now.getFullYear();
let hour = now.getHours();

let minute = now.getMinutes();

let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Suturday"
];
let day = days[now.getDay()];
let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
];
let month = months[now.getMonth()];
h2.innerHTML = ` ${day}, ${month}, ${date}, ${year} at ${hour} : ${minute} ⏱`;

function degreeFar(event) {
    event.preventDefault();
    let currentFar = document.querySelector("#current-temp");
    currentFar.innerHTML = "70°C";
}
function degreeCel(event) {
    event.preventDefault();
    let currentCel = document.querySelector("#current-temp");
    currentCel.innerHTML = "21°C";
}

let farenElement = document.querySelector("#farenheit");
let celElement = document.querySelector("#celsius");
farenElement.addEventListener("click", degreeFar);
celElement.addEventListener("click", degreeCel);

////Temperature///
searchCity();

function searchCity(event) {
    let searchForm = document.querySelector("#search-form");
    searchForm.addEventListener("submit", changeCity);
}

function changeCity(event) {
    event.preventDefault();
    let inputCity = document.querySelector("#input-city");
    let city = document.querySelector("#city");
    city.innerHTML = `${inputCity.value}`;

    let apiKey = `981c2b1245628edacb7d16aee1829045`;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${
        inputCity.value
        }&appid=${apiKey}&units=metric`;

    axios.get(url).then(showTemp);
}

function showTemp(response) {
    let currentTemp = Math.round(response.data.main.temp);
    let temp = document.querySelector("#current-temp");
    temp.innerHTML = `${currentTemp}°C`;

    let humi = document.querySelector("#humidity");
    humi.innerHTML = response.data.main.humidity;

    let currentWind = Math.round(response.data.wind.speed);
    let wind = document.querySelector("#wind");
    wind.innerHTML = `${currentWind}km/h`;
}

////Current location///
let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", getCurrentLocation);

function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(showLocation);
}

function showLocation(position) {
    let apiKey = `981c2b1245628edacb7d16aee1829045`;
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(url).then(showTemp);
}
let h5 = document.querySelector("h5");
h5.innerHTML = "🌍";
