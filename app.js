const inputs=document.querySelector("#inputs")
const searchInput=document.querySelector("#searchInput")
const searchButton=document.querySelector("#searchButton")
const form=document.querySelector("#form")
const situation=document.querySelector("#situation")
let value

const apiKey="e2939443c3df20c6a7e12ccae9c6043c"
form.addEventListener("submit",run)

function run(e){
    e.preventDefault()
    situation.innerHTML=""
    value=searchInput.value.toLowerCase().trim()
    const searchAlert=document.createElement("div")
        searchAlert.className="alert alert-danger"
        searchAlert.role="alert"
    if(value===""){
        searchAlert.textContent="Please Search For a City"
        document.body.appendChild(searchAlert)
        setTimeout(()=>{
            searchAlert.remove()
        },2000)

    }else{
        searchInput.value=""

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${apiKey}&units=metric&lang=tr`,{
        method:"GET"
    })
    .then((response)=>{
        return response.json()
    })
    .then((data)=>{
        console.log(data)
        const city=data.name
        const temp=data.main.temp
        const weather=data.weather[0].description
        const main=data.weather[0].main
        addWeatherToUOI(city,temp,weather,main)
    })
    .catch((error)=>{
        console.log(error)
    })
}

function addWeatherToUOI(city,temp,weather,main){
    const div=document.createElement("div")
    div.className="result"
    situation.appendChild(div)

    const img=document.createElement("img")

    if(main === "Clear"){
        img.src = "Images/sun_icon.png"
    }
    else if(main === "Clouds"){
        img.src = "Images/clouds_icon.png"
    }
    else if(main === "Rain" || main === "Drizzle" || main === "Thunderstorm" || main === "Sand" || main === "Ash" || main === "Squall" || main === "Tornado"){
        img.src = "Images/rain_icon.jpg"
    }
    else if(main === "Snow"){
        img.src = "Images/snow_icon.jpg"
    }
    else if(main === "Mist" || main === "Smoke" || main === "Haze" || main === "Dust" || main === "Fog"){
        img.src = "Images/fog_icon.jpg"
    }

    const cityName=document.createElement("h2")
    cityName.textContent=`📍 ${city}`

    const tempMeasurement=document.createElement("h5")
    tempMeasurement.textContent=`🌡️ ${temp}°`
    tempMeasurement.className="temp"

    const weatherResult=document.createElement("h5")
    const formatted = toTitleCase(weather);
    weatherResult.className="weatherResult"
    weatherResult.textContent=`Hava Durumu: ${formatted} `

    div.appendChild(img)
    img.className="images"
    div.appendChild(cityName)
    div.appendChild(tempMeasurement)
    div.appendChild(weatherResult)
    }
} 

function toTitleCase(str) {
    return str
        .toLowerCase()
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}