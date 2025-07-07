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
const forecastTemp1 = document.querySelector('#forecastTemp1')
const forecastTemp2 = document.querySelector('#forecastTemp2')
const forecastTemp3 = document.querySelector('#forecastTemp3')
const forecastDate1 = document.querySelector('#forecastDate1')
const forecastDate2 = document.querySelector('#forecastDate2')
const forecastDate3 = document.querySelector('#forecastDate3')
const forecastImg1 = document.querySelector('#forecastImg1')
const forecastImg2 = document.querySelector('#forecastImg2')
const forecastImg3 = document.querySelector('#forecastImg3')

const apiKey = '553ce1e31384467bb5c70431250707'
let city = "Delhi"
let data;



async function changeWeather() {
    try {

        let response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=4&aqi=no&alerts=no `)
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

    locations.textContent = data.location.name

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

    const forecastTemp1value =  data.forecast.forecastday[1].day.avgtemp_c

    forecastTemp1.textContent = `${forecastTemp1value} ℃ `

    const forecastTemp2value =  data.forecast.forecastday[2].day.avgtemp_c

    forecastTemp2.textContent = `${forecastTemp2value} ℃ `

    const forecastTemp3value =  data.forecast.forecastday[3].day.avgtemp_c

    forecastTemp3.textContent = `${forecastTemp3value} ℃ `

    const forecastDate1value = data.forecast.forecastday[1].date

    forecastDate1.textContent = formatDate(forecastDate1value)

    const forecastDate2value = data.forecast.forecastday[2].date

    forecastDate2.textContent = formatDate(forecastDate2value)

    const forecastDate3value = data.forecast.forecastday[3].date

    forecastDate3.textContent = formatDate(forecastDate3value)

    const forecastImg1value = data.forecast.forecastday[1].day.condition.icon

    forecastImg1.src = `http:${forecastImg1value}`

    const forecastImg2value = data.forecast.forecastday[2].day.condition.icon

    forecastImg2.src = `http:${forecastImg2value}`

    const forecastImg3value = data.forecast.forecastday[3].day.condition.icon

    forecastImg3.src = `http:${forecastImg3value}`

}

function getDate(dateStr) {
    const date = new Date(dateStr);

    const weekday = date.toLocaleString('default', { weekday: 'short' }); // e.g., Wed
    const day = date.getDate(); // e.g., 7
    const month = date.toLocaleString('default', { month: 'short' }); // e.g., Aug

    return `${weekday}, ${day} ${month}`;
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    const month = date.toLocaleString('default', { month: 'short' }); // "Aug"
    const day = String(date.getDate()).padStart(2, '0'); // "08"
    return `${month} ${day}`;
}

