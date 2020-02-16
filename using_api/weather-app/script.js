const appId = "82005d27a116c2880c8f0fcb866998a0";
const units = "metric";
let searchMethod;
let searchTerm;

function getSearchMethod(searchTerm){
	if(searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm) {
		searchMethod = 'zip'
	}

	else {
		searchMethod = 'q'
	}
}

function searchWeather(searchForm) {
	getSearchMethod(searchTerm);
	fetch(`https://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchForm}&APPID=${appId}&units=${units}`).then(result =>{
		return result.json();
	}).then(result => {
		init(result);
	})
}

function init(resultFromServer) {
	switch(resultFromServer.weather[0].main){
		case 'Clear':
			document.body.style.backgroundImage = 'url("clear.jpeg")';
			break;

		case 'Clouds':
			document.body.style.backgroundImage = 'url("cloudy.jpeg")';
			break;

		case 'Rain':
		case 'Drizzle':
		case 'Mist':
			document.body.style.backgroundImage = 'url("rain.jpeg")';
			break;

		case 'ThunderStorm':
			document.body.style.backgroundImage = 'url("storm.jpg")';
			break;

		case 'Snow':
			document.body.style.backgroundImage = 'url("snow.jpg")';
			break;

		default:
			break;
	}

	let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
	let temperatureElement = document.getElementById('temperature');
	let humidityElement = document.getElementById('humidity');
	let windySpeedElement= document.getElementById('windSpeed');
	let cityHeader = document.getElementById('cityName');
	let weatherIcon = document.getElementById('documentIconImg'); 

	weatherIcon.src = 'http://openweathermap.org/img/w/' + resultFromServer.weather[0].icon + '.png';

	let resultDescription = resultFromServer.weather[0].description;
	weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);

	temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176';
	windySpeedElement.innerHTML = 'Ventos de ' + Math.floor(resultFromServer.wind.speed) + 'm/s';
	cityHeader.innerHTML = resultFromServer.name;
	humidityElement.innerHTML = 'Humidade com níveis de ' + resultFromServer.main.humidity + '%';

	setPositionForWeatherInfo();
}

function setPositionForWeatherInfo() {
	let weatherContainer = document.getElementById('weatherContainer');
	// let weatherContainerHeight = weatherContainer.clientHeight;
	// let weatherContainerWidth = weatherContainer.clientWidth;

	// weatherContainer.style.left = `calc(50% - ${weatherContainerWidth/2})px`;
	// weatherContainer.style.top = `calc(50% - ${weatherContainerHeight/1.3})px`;
	weatherContainer.style.visibility = 'visible';


}
document.getElementById('searchBtn').addEventListener('click', () => {
	searchTerm = document.getElementById('searchInput').value;

	if(searchTerm) {
		searchWeather(searchTerm);
	}
})