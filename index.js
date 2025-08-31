userlocation=document.querySelector("#userLocation");
converter= document.getElementById("converter"),
weatherIcon= document.querySelector(".weatherIcon"),
temperature = document.querySelector(".temperature"),
feelsLike = document.querySelector(".feelslike"),
description = document.querySelector(".description"),
date = document.querySelector(".date"),
City = document.querySelector(".city"),
HValue = document.getElementById("HValue"),
WValue = document.getElementById("WValue"),
SRValue = document.getElementById("SRValue"),
SSValue = document.getElementById("SSValue"),
CValue = document.getElementById("CValue"),
UVValue = document.getElementById("UVValue"),
PValue = document.getElementById("PValue"),
Forecast = document.querySelector(".Forecast");


WEATHER_API_ENDPOINT=`https://api.openweathermap.org/data/2.5/weather?appid=a5bb4718b30b6f58f58697997567fffa&q=`;
WEATHER_DATA_ENDPOINT=`http://api.openweathermap.org/data/2.5/forecast?appid=a5bb4718b30b6f58f58697997567fffa&exclude=minutely&units=metric&`;

function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                fetchWeatherByCoords(lat, lon);
            },
            (error) => {
                alert("Unable to get your location: " + error.message);
            }
        );
    } else {
        alert("Geolocation is not supported by your browser");
    }
}

function fetchWeatherByCoords(lat, lon) {
    document.querySelector(".Forecast").innerHTML = "";
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=a5bb4718b30b6f58f58697997567fffa`)
        .then(response => response.json())
        .then(data => {
            if (data.cod !== 200) {
                alert(data.message);
                return;
            }
           
 document.querySelector(".city").innerHTML = data.name + " , " + data.sys.country;
document.querySelector(".weatherIcon").style.background = `url(https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png)`;

    
            fetch(WEATHER_DATA_ENDPOINT + `lon=${data.coord.lon}&lat=${data.coord.lat}`)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    document.querySelector(".temperature").innerHTML = temConverter(data.list[0].main.temp);
                    document.querySelector(".feelslike").innerHTML = "Feels like " + data.list[0].main.feels_like;
                    document.querySelector(".description").innerHTML = `<i class="fa-brands fa-cloudversify"></i> &nbsp;` + data.list[0].weather[0].description;

                    const options = {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                    };
                    document.querySelector(".date").innerHTML = getLongFormateDateTime(data.list[0].dt, data.city.timezone, options);

                    document.querySelector("#HValue").innerHTML = Math.round(data.list[0].main.humidity) + "<span>%</span>";
                    document.querySelector("#WValue").innerHTML = Math.round(data.list[0].wind.speed) + "<span>m/s</span>";
                    const options1 = {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                    };
                    document.querySelector("#SRValue").innerHTML = getLongFormateDateTime(data.city.sunrise, data.city.timezone, options1);
                    document.querySelector("#SSValue").innerHTML = getLongFormateDateTime(data.city.sunset, data.city.timezone, options1);
                    document.querySelector("#CValue").innerHTML = Math.round(data.list[0].clouds.all) + "<span>%</span>";
                    document.querySelector("#UVValue").innerHTML = Math.round(data.list[0].main.grnd_level) + "<span></span>";
                    document.querySelector("#PValue").innerHTML = Math.round(data.list[0].main.pressure) + "<span>hPa</span>";

                    
                    let processedDates = new Set();
                    data.list.forEach((weather) => {
                        
                        let date = new Date(weather.dt * 1000);
                        let dateString = date.toDateString();
                        
                        
                        if (!processedDates.has(dateString)) {
                            processedDates.add(dateString);
                            
                            let div = document.createElement("div");
                            const options = {
                                weekday: 'long',
                                month: 'long',
                                day: 'numeric'
                            };
                            let dateStr = getLongFormateDateTime(weather.dt, data.city.timezone, options);
                            div.innerHTML = dateStr;
                            div.innerHTML += `<img src="https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png" />`;
                            div.innerHTML += `<p class="forecast-desc">${weather.weather[0].description}</p>`;
                            div.innerHTML += `<span class="tempa"><span>${temConverter(weather.main.temp_min)}</span>&nbsp;&nbsp;<span>${temConverter(weather.main.temp_max)}</span></span>`;
                            document.querySelector(".Forecast").append(div);
                        }
                    });
                });
        })
        .catch(error => {
            alert("Error fetching weather data: " + error.message);
        });
}

function findUserLocation(){
    document.querySelector(".Forecast").innerHTML = "";
    fetch(WEATHER_API_ENDPOINT + userLocation.value)
.then((response)=>response.json())
.then((data)=>{
    if(data.cod!="" && data.cod!=200){
        alert(data.message);
        return;
    }
    console.log(data);

    document.querySelector(".city").innerHTML = data.name + " , "+ data.sys.country;
document.querySelector(".weatherIcon").style.background=`url( https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png)`

    fetch(WEATHER_DATA_ENDPOINT + `lon=${data.coord.lon}&lat=${data.coord.lat}`)
    .then((response)=>response.json())
    .then((data)=>{
        console.log(data);
        document.querySelector(".temperature").innerHTML = temConverter(data.list[0].main.temp);
        document.querySelector(".feelslike").innerHTML = "Feels like  "+data.list[0].main.feels_like;
        document.querySelector(".description").innerHTML = `<i class="fa-brands fa-cloudversify"></i> &nbsp;`+ data.list[0].weather[0].description;
       
        const options={
            weekday:"long",
            month:"long",
            day:"numeric",
            hour:"numeric",
            minute:"numeric",
            hour12:true,
        };
        document.querySelector(".date").innerHTML=getLongFormateDateTime(data.list[0].dt,data.city.timezone,options)

        document.querySelector("#HValue").innerHTML=Math.round(data.list[0].main.humidity)+"<span>%</span>";
        document.querySelector("#WValue").innerHTML=Math.round(data.list[0].wind.speed)+"<span>m/s</span>";
        const options1 = {
            hour:"numeric",
            minute:"numeric",
            hour12:true,
        };
         document.querySelector("#SRValue").innerHTML=getLongFormateDateTime(data.city.sunrise,data.city.timezone,options1);
          document.querySelector("#SSValue").innerHTML=getLongFormateDateTime(data.city.sunset,data.city.timezone,options1);
    document.querySelector("#CValue").innerHTML=Math.round(data.list[0].clouds.all)+"<span>%</span>";
    document.querySelector("#UVValue").innerHTML=Math.round(data.list[0].main.grnd_level)+"<span></span>";
    document.querySelector("#PValue").innerHTML=Math.round(data.list[0].main.pressure)+"<span>hPa</span>";   
         
    
    let processedDates = new Set();
    data.list.forEach((weather) => {
        
        let date = new Date(weather.dt * 1000);
        let dateString = date.toDateString();
        
       
        if (!processedDates.has(dateString)) {
            processedDates.add(dateString);
            
            let div = document.createElement("div");
            const options = {
                weekday: 'long',
                month: 'long',
                day: 'numeric'
            };
            let dateStr = getLongFormateDateTime(weather.dt, data.city.timezone, options);
            div.innerHTML = dateStr;
            div.innerHTML += `<img src="https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png" />`;
            div.innerHTML += `<p class="forecast-desc">${weather.weather[0].description}</p>`;
            div.innerHTML += `<span class="tempa"><span>${temConverter(weather.main.temp_min)}</span>&nbsp;&nbsp;<span>${temConverter(weather.main.temp_max)}</span></span>`;
            document.querySelector(".Forecast").append(div);
        }
    });
    });
});
}

function formatUnixTime(dtValue,offSet,options={}){
    const date = new Date((dtValue+offSet)*1000);
    return date.toLocaleTimeString([],{timeZone:"UTC", ...options  });
}


function getLongFormateDateTime(dtValue,offSet,options){
    return formatUnixTime(dtValue,offSet,options);
}

function checkWeatherAlert(temp) {
    const tempValue = Math.round(temp);
    if (tempValue >= 40) {
        const alertDiv = document.createElement('div');
        alertDiv.className = 'weather-alert';
        alertDiv.style.backgroundColor = '#ff4444';
        alertDiv.style.color = 'white';
        alertDiv.style.padding = '10px';
        alertDiv.style.margin = '10px 0';
        alertDiv.style.borderRadius = '5px';
        alertDiv.style.textAlign = 'center';
        alertDiv.innerHTML = `<strong>⚠️ Extreme Temperature Alert!</strong><br>
            Temperature is ${tempValue}°C. Take precautions:
            <ul style="list-style: none; padding: 5px;">
                <li>• Stay hydrated</li>
                <li>• Avoid direct sunlight</li>
                <li>• Limit outdoor activities</li>
            </ul>`;
        
        
        const weatherInput = document.querySelector('.weather-input');
        weatherInput.insertBefore(alertDiv, weatherInput.firstChild);
        
        
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.parentNode.removeChild(alertDiv);
            }
        }, 10000);
    }
}

function temConverter(temp){
    let tempValue=Math.round(temp);
    let message ="";
    
    if(document.querySelector(".converter").value=="°C"){
        message=tempValue+"<span>"+"\xB0C</span>"
        // Check ftemperature when in Celsius
        checkWeatherAlert(tempValue);
    }
    else{
        let ctof =(tempValue*9)/5+32;
        message=ctof+"<span>"+"\xB0F</span>";
        // Convert back to Celsius for alert check
        checkWeatherAlert(tempValue);
    }
     return message;
}



