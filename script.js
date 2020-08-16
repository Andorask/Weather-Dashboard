$(document).ready(function () {

    var cityName,
    var cityId, 
    var country, 
    var temp, 
    var tempFarenheit, 
    var windSpeed,
    var humidity,  
    var icon, 
    var lon, 
    var lat, 
    var dt, 
    var currentDate, 
    var cnt, 
    var uvIndex;
    var cityFinder = false;
    var initGetLocation = true;
    var apiKey = "857ea1e75f5fbb6b1fae90916208dc3b";
    init();

    function init() {
         findLocation();
    }

    function showCoordinates(position) {
         lon = position.coords.longitude;
         lat = position.coords.latitude;
         showLocation(lat, lon)
    }

    function findLocation() {
     if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
     } else {
          alert("Geolocation must be allowed.");
          }
     }

    function showLocation(latitude, longitude) {
         var queryURL = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&lat=${latitude}&lon=${longitude}`;
         $.ajax({
              url: queryURL,
              method: "GET"
         }).then(function (response) {
              $("#search").val(response.name);
              weatherInfo();
         });
    };

    function weatherInfo() {
         cityName = $("#search").val().trim();
         var queryURLWeather = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
         $.ajax({
              url: queryURLWeather,
              method: "GET",
              success: function(){
                   cityFinder = true;
              }, 
              error: function(){
                   cityFinder = false;
                   alert("City was not found");
                   $("#search").val("");
              }     
              }).then(function (response) {
                   temp = response.main.temp;
                   cityId = response.id;
                   country = response.sys.country;
                   tempFarenheit = ((temp - 273.15) * 1.80 + 32).toFixed(2);
                   windSpeed = response.wind.speed;
                   humidity = response.main.humidity;
                   icon = response.weather[0].icon;
                   lat = response.coord.lat;
                   lon = response.coord.lon;
                   dt = response.dt;
                   currentDate = new Date(dt * 1000);
              });
         }

    function fivedayForcast() {
                   cnt = 5;
                   var queryURLForecast = `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${apiKey}`;
                   $.ajax({
                        url: queryURLForecast,
                        method: "GET"
                   }).then(function (response) {
                        var objArray = [];
                        for (var i = 0; i < 40; i = i + 8) {
                             var obj = {
                                  temp: response.list[i].main.temp,
                                  humidity: response.list[i].main.humidity,
                                  icon: response.list[i].weather[0].icon,
                                  dt: response.list[i].dt
                             };
                             objArray.push(obj);
                        }
                   });
              }
});