
const mainContainer = document.querySelector('.container');
const displayBar = document.querySelector('.displayBar');
const searchBar = document.querySelector('#searchBarText');
const searchBtn = document.querySelector('.searchBtnArea');
const locations = document.querySelector('#location');
const weatherIcon = document.querySelector('#weatherIcon');
const dateTime = document.querySelector('#dateTime');
const temperature = document.querySelector('#temperature');
const clouds = document.querySelector('#clouds');
const humidity = document.querySelector('#humidity');
const windSpeed = document.querySelector('#windSpeed');
const errorDisplay = document.querySelector('#errorDisplay');
const searchCity = document.querySelector('.searchCity');
const mainContent = document.querySelector('.mainContent');
const forecastTemp1 = document.querySelector('#forecastTemp1');
const forecastTemp2 = document.querySelector('#forecastTemp2');
const forecastTemp3 = document.querySelector('#forecastTemp3');
const forecastDate1 = document.querySelector('#forecastDate1');
const forecastDate2 = document.querySelector('#forecastDate2');
const forecastDate3 = document.querySelector('#forecastDate3');
const forecastImg1 = document.querySelector('#forecastImg1');
const forecastImg2 = document.querySelector('#forecastImg2');
const forecastImg3 = document.querySelector('#forecastImg3');


const apiKey = 'cd099a8690114acfb68180842251609';


async function changeWeather(city) {
    try {
        let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=4&aqi=no&alerts=no`);
        let data = await response.json();
        console.log(data);
        changeToContent(data);
        searchCity.style.cssText = "display: none";
        mainContent.style.cssText = 'display: contents';
        displayBar.replaceChildren(mainContent);
    } catch (error) {
        searchCity.style.cssText = "display: none";
        errorDisplay.style.cssText = "display: contents";
        displayBar.replaceChildren(errorDisplay);
        console.error(error);
    }
}

function keyvalue(event) {
    if (event.key === 'Enter' && searchBar.value.trim() !== "") {
        const city = searchBar.value;
        changeWeather(city);
    }
}

function searchBtnClick() {
    if (searchBar.value.trim() !== "") {
        const city = searchBar.value;
        changeWeather(city);
    }
}


searchBar.addEventListener("keydown", keyvalue);
searchBtn.addEventListener("click", searchBtnClick);



function changeToContent(data) {

    let region = data.location.name;
    let country = data.location.country;
    locations.textContent = `${region}, ${country}`;
    locations.style.cssText = "text-transform: capitalize;  font-weight: 600; color: #fff;";
    weatherIcon.src = `https:${data.current.condition.icon}`;
    temperature.textContent = `${data.current.heatindex_c} ℃`;
    clouds.textContent = data.current.condition.text.split(" ").slice(0, 2).join(" ");
    humidity.textContent = `${data.current.humidity} %`;
    windSpeed.textContent = `${data.current.wind_kph} K/h`;
    dateTime.textContent = getDate(data.location.localtime);

    forecastTemp1.textContent = `${data.forecast.forecastday[1].day.avgtemp_c} ℃ `;
    forecastTemp2.textContent = `${data.forecast.forecastday[2].day.avgtemp_c} ℃ `;
    forecastTemp3.textContent = `${data.forecast.forecastday[3].day.avgtemp_c} ℃ `;

    forecastDate1.textContent = formatDate(data.forecast.forecastday[1].date);
    forecastDate2.textContent = formatDate(data.forecast.forecastday[2].date);
    forecastDate3.textContent = formatDate(data.forecast.forecastday[3].date);

    forecastImg1.src = `http:${data.forecast.forecastday[1].day.condition.icon}`;
    forecastImg2.src = `http:${data.forecast.forecastday[2].day.condition.icon}`;
    forecastImg3.src = `http:${data.forecast.forecastday[3].day.condition.icon}`;
}


function getDate(dateStr) {
    const date = new Date(dateStr);
    const weekday = date.toLocaleString('default', { weekday: 'short' });
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    return `${weekday}, ${day} ${month}`;
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    const month = date.toLocaleString('default', { month: 'short' });
    const day = String(date.getDate()).padStart(2, '0');
    return `${month} ${day}`;
}

