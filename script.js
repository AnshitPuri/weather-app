const locations = document.querySelector('#location')
const weatherIcon = document.querySelector('#weatherIcon')
const dateTime = document.querySelector('#dateTime')
const temperature = document.querySelector('#temperature')
const clouds = document.querySelector('#clouds')
const humidity = document.querySelector('#humidity')
const windSpeed = document.querySelector('#windSpeed')

const apiKey = '553ce1e31384467bb5c70431250707'
let city = "Poland"
let data;
const mainContainer = document.querySelector('.container')

async function changeWeather() {
    try {
        let response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`)
        data = await response.json()
        changeToContent()
        console.log(data)
    } catch (error) {
        mainContainer.textContent = "Invalid City"
        console.error(error)
    }
}
changeWeather()

function changeToContent() {
    locations.textContent = data.location.country
    // const iconCode = data.weather[0].icon
    // weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`
    const temperatureValue = data.current.heatindex_c
    temperature.textContent = `${temperatureValue} ℃`
    // clouds.textContent = data.current.condition.text
    const humidityValue = data.current.humidity
    humidity.textContent = `${humidityValue} %`
    const windSpeedValue = data.current.wind_kph
    windSpeed.textContent = `${windSpeedValue} K/h`
    
}   
