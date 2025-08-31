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
        document.querySelector(".date").innerHTML=getLongFormateDateTime(data.list.dt,data.city.timezone,options)

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
         
    data.list.forEach((weather,i)=>{
            let div = document.createElement("div");
            const options={
                weekday:'long',
                month:'long',
                day :'numeric'
            };
            let daily = getLongFormateDateTime(data.list[i].dt,0,options).split("at");
            div.innerHTML= daily[i];
            div.innerHTML+=`<img src= "https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png" />`
            div.innerHTML+='<p class="forecast-desc>${data.list[i].weather[0].description}"></p> ' ;
            div.innerHTML+= `<span class="tempa"><span>${temConverter(data.list[i].main.temp_min)}</span>&nbsp;&nbsp;<span>${temConverter(data.list[0].main.temp_max)} </span></span> `         
            document.querySelector(".Forecast") .append(div);
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

function temConverter(temp){
    let tempValue=Math.round(temp);
    let message ="";
    
    if(document.querySelector(".converter").value=="°C"){
        message=tempValue+"<span>"+"\xB0C</span>"
    }
    else{
        let ctof =(tempValue*9)/5+32;
        message=ctof+"<span>"+"\xB0F</span>";
       
    }
     return message;
}



