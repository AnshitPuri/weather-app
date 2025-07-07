const mainContainer = document.querySelector('.container')
const displayBar = document.querySelector('.displayBar')
const locations = document.querySelector('#location')
const weatherIcon = document.querySelector('#weatherIcon')
const dateTime = document.querySelector('#dateTime')
const temperature = document.querySelector('#temperature')
const clouds = document.querySelector('#clouds')
const humidity = document.querySelector('#humidity')
const windSpeed = document.querySelector('#windSpeed')
const errorDisplay = document.querySelector('#errorDisplay')
const searchCity = document.querySelector('.searchCity')
const mainContent = document.querySelector('.mainContent')

const apiKey = '553ce1e31384467bb5c70431250707'
let city = "Delhi"
let data;




async function changeWeather() {
    try {

        let response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`)
        data = await response.json()
        changeToContent()
        searchCity.style.cssText = "display: none";
        mainContent.style.cssText = 'display: contents'
        displayBar.replaceChildren(mainContent)
        console.log(data)

    } catch (error) {

        searchCity.style.cssText = "display: none";
        errorDisplay.style.cssText = "display: contents;"
        displayBar.replaceChildren(errorDisplay);
        console.error(error)
    }
}
changeWeather()

function changeToContent() {

    locations.textContent = data.location.region

    const iconCode = data.current.condition.icon

    weatherIcon.src = `https:${iconCode}`

    console.log(iconCode)

    const temperatureValue = data.current.heatindex_c

    temperature.textContent = `${temperatureValue} ℃`

    const cloudinitial = data.current.condition.text

    const cloudValue = cloudinitial.split(" ").slice(0,2).join(" ")
    clouds.textContent = cloudValue

    const humidityValue = data.current.humidity

    humidity.textContent = `${humidityValue} %`

    const windSpeedValue = data.current.wind_kph

    windSpeed.textContent = `${windSpeedValue} K/h`

    const date = data.location.localtime

    let formattedDate = getDate(date);

    dateTime.textContent = formattedDate

}

function getDate(dateStr) {
    const date = new Date(dateStr);

    const weekday = date.toLocaleString('default', { weekday: 'short' }); // e.g., Wed
    const day = date.getDate(); // e.g., 7
    const month = date.toLocaleString('default', { month: 'short' }); // e.g., Aug

    return `${weekday}, ${day} ${month}`;
}

