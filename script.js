const locations = document.querySelector('#location')
const weatherIcon = document.querySelector('#weatherIcon')
const dateTime = document.querySelector('#dateTime')
const temperature = document.querySelector('#temperature')
const clouds = document.querySelector('#clouds')
const apiKey = 'bd5e378503939ddaee76f12ad7a97608'
let city = "Delhi"
let data;
const mainContainer = document.querySelector('.container')

async function changeWeather() {
    try {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
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
    locations.textContent = data.name
    // dateTime.textContent = data.list[0].dt_txt
    // let iconCode = data.list[0].weather[0].icon;
    // weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`
}   
