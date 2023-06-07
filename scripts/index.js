"use strict";

const cityDropdown = document.getElementById("cityDropdown");//City dropdown

const latitudeOutput = document.getElementById("latitudeOutput"); // Latitude Output
const longitudeOutput = document.getElementById("longitudeOutput"); // Longitude Output

const geoCard = document.getElementById("geoCard"); //Geographic Location Card
const table = document.getElementById("table"); // Table with weather information

const weathertablebody = document.getElementById("weathertablebody"); // the weather table




window.onload = function(){


  addCitiesToDropDown()

  hideGeographicLocationCard();

    hideTableCard();

  cityDropdown.onchange = showGeographicLocation;
    
    }


    //functions - adds cities to dropdown
    function addCitiesToDropDown() {


    for (let city of cities) {
        let newOption = new Option(city.name);
        cityDropdown.appendChild(newOption);
 
      }
            console.log(cityDropdown);

           
           
}


/*_______function shows the geographic location for the chosen city_______*/
function showGeographicLocation(){

 let selectedCity = cityDropdown.value; //City Selected from dropdown

 if (selectedCity !== "") {
  let theSelectedCity = cities.find(city => city.name === selectedCity);
 

 let latitude = theSelectedCity.latitude;
 let longitude = theSelectedCity.longitude;

 console.log(latitude);//Outputs latitude
 console.log(longitude);//Outputs longitude

 latitudeOutput.innerHTML = latitude;
 longitudeOutput.innerHTML = longitude;

 showGeographicLocationCard();
 showTableCard();
 getWeatherFromAPIForCity();
}else {
  // Reset the display when "select one" is selected
  hideGeographicLocationCard();
  hideTableCard();
}

}


/*________function hides and shows the geographic locations_____________*/
function hideGeographicLocationCard() {

  geoCard.style.display = "none";

}

function showGeographicLocationCard() {

  geoCard.style.display = "block";

}


/*_______function hides and shows the table card_________*/
function hideTableCard() {

  table.style.display = "none";

}

function showTableCard() {

  table.style.display = "block";

}
/*____________________________________________________________*/



// Function - This is going to fetch the weather content for the city selected using the city,
// longitude, and latitude

function getWeatherFromAPIForCity(latitude, longitude){

  let selectedCity = cityDropdown.value;

const theSelectedCity = cities.find(city => city.name === selectedCity);
const stationLookupUrl = `https://api.weather.gov/points/${theSelectedCity.latitude},${theSelectedCity.longitude}`;


fetch(stationLookupUrl)
.then(response => response.json())
.then(data =>{
  const weatherUrl = data.properties.forecast; //gets the forecast
  getWeather(weatherUrl);


})
    
}


function getWeather(weatherUrl) {
  console.log("executing getweather with" + weatherUrl)
  fetch(weatherUrl)
      .then(response => response.json())
      .then(data => {
          const forecastArray = data.properties.periods;  //get the periods
  displayWeather(forecastArray);                          // display the periods in an array  
      })
}

function displayWeather(forecastArray){   
  console.log(forecastArray); // Checking to see if the array has been formed

  // create the table

  for(let rowdata of forecastArray){
      let newrow = weathertablebody.insertRow(-1);
      let newcell1 = newrow.insertCell(0);
      newcell1.innerHTML = rowdata.name;

      let newcell2 = newrow.insertCell(1)
      newcell2.innerHTML = rowdata.temperature + rowdata.temperatureUnit;

      let newcell3 = newrow.insertCell(2)
      newcell3.innerHTML = rowdata.windDirection + " " + rowdata.windSpeed;

      let newcell4 = newrow.insertCell(3)
      newcell4.innerHTML = rowdata.shortForecast;
      
      }
}