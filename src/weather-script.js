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
	let temperatureElement = document.querySelector("#temperature");
	let cityElement = document.querySelector("#submitCity");
	let descriptionElement = document.querySelector("#description");
	let humidityElement = document.querySelector("#humidity");
	let windspeedElement = document.querySelector("#speed");
	temperatureElement.innerHTML = Math.round(response.data.main.temp);
	cityElement.innerHTML = response.data.name;
	descriptionElement.innerHTML = response.data.weather[0].description;
	humidityElement.innerHTML = response.data.main.humidity;
	windspeedElement.innerHTML = Math.round(response.data.wind.speed);
}

let city = "Galway";
let units = "metric";

let apiKey = "350541b21f9e750e54359106bf7f6f0d";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

axios.get(apiUrl).then(currentTemperature);
