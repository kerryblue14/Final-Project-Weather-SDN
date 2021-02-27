function formatDate(timestamp) {
	let date = new Date(timestamp);
	let days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];

	let months = [
		"January",
		"Febuary",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	let day = days[date.getDay()];
	let hour = [date.getHours()];
	if (hour < 10) {
		hour = "0" + hour;
	}
	let minute = [date.getMinutes()];
	if (minute < 10) {
		minute = "0" + minute;
	}
	let month = months[date.getMonth()];
	let dayDate = [date.getDate()];
	return (currentDate = `${day}, ${dayDate} ${month} ${hour}:${minute}`);
}

let now = new Date();
let currentDate = document.querySelector("#date");
currentDate.innerHTML = formatDate(now);

function currentTemperature(response) {
	console.log(response.data);
	let temperatureElement = document.querySelector("#temperature");
	let cityElement = document.querySelector("#submitCity");
	let descriptionElement = document.querySelector("#description");
	let precipitationElement = document.querySelector("#precipitation");
	let feelingElement = document.querySelector("#feeling");
	let humidityElement = document.querySelector("#humidity");
	let windspeedElement = document.querySelector("#speed");
	let iconElement = document.querySelector("#icon");

	celciusDisp = response.data.main.temp;

	temperatureElement.innerHTML = Math.round(celciusDisp);
	cityElement.innerHTML = response.data.name;
	descriptionElement.innerHTML = response.data.weather[0].description;
	feelingElement.innerHTML = Math.round(response.data.main.feels_like);
	humidityElement.innerHTML = response.data.main.humidity;
	windspeedElement.innerHTML = Math.round(response.data.wind.speed);
	iconElement.setAttribute(
		"src",
		`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
	);
}

let city = "London";
let units = "metric";

let apiKey = "350541b21f9e750e54359106bf7f6f0d";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
//https://api.openweathermap.org/data/2.5/forecast?q=London,GB&appid=70b7d9657fab85757e7a28d70b47e52f
axios.get(apiUrl).then(currentTemperature);

function searchWeather(city) {
	let apiKey = "350541b21f9e750e54359106bf7f6f0d";
	let units = "metric";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
	axios.get(apiUrl).then(currentTemperature);
}

function searchCity(event) {
	event.preventDefault();
	let submitCity = document.querySelector("#search-input");
	let h1 = document.querySelector("h1");
	if (submitCity) {
		h1.innerHTML = `${submitCity.value}`;
		searchWeather(submitCity.value);
	} else {
		h1.innerHTML = null;
	}
}

let form = document.querySelector("#city-selector");
form.addEventListener("submit", searchCity);

//for location-button
function showPosition(position) {
	let latitude = position.coords.latitude;
	let longitude = position.coords.longitude;
	let units = "metric";
	let apiKey = "350541b21f9e750e54359106bf7f6f0d";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
	axios.get(apiUrl).then(currentTemperature);
}
function getPosition(event) {
	event.preventDefault();
	navigator.geolocation.getCurrentPosition(showPosition);
}

let btnCurrent = document.querySelector("#location-button");
btnCurrent.addEventListener("click", getPosition);

function showFahrenheitTemp(event) {
	event.preventDefault();
	let temperatureElement = document.querySelector("#temperature");

	celciusLink.classList.remove("working");
	fahrenheitLink.classList.add("working");

	let fahrenheitDisp = (celciusDisp * 9) / 5 + 32;
	temperatureElement.innerHTML = Math.round(fahrenheitDisp);
}

let celciusDisp = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

function showCelciusTemp(event) {
	event.preventDefault();
	celciusLink.classList.add("working");
	fahrenheitLink.classList.remove("working");

	let temperatureElement = document.querySelector("#temperature");
	temperatureElement.innerHTML = Math.round(celciusDisp);
}

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", showCelciusTemp);
