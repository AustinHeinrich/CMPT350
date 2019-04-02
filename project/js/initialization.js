const cssID = "/css/style.css";
const src_204 = "/images/204.jpg";
var initLat;
var intLng;
var infowindow;
var map;

/*
 * initMap()
 * initializes the map on page load
 * tries to load current location, presents error if it cannot
 */
function initMap() {

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      initLat = position.coords.latitude;
      initLng = position.coords.longitude;
      console.log('initLat: ' + initLat, 'initLng: ' + initLng);

      map = new google.maps.Map(document.getElementById("map"), {
        enableHighAccuracy: true,
        center: {
          lat: initLat,
          lng: initLng
        },
        zoom: 13
      });

      infowindow = new google.maps.InfoWindow();

      // load extra elements only if geolocation is active
      var center_button = document.createElement("button");
      document.getElementById("control").appendChild(center_button);
      center_button.innerHTML = "Center";
      center_button.id = "center-button";

      var restaurant_switch = document.createElement("button");
      document.getElementById("control").appendChild(restaurant_switch);
      restaurant_switch.innerHTML = "Show Restaurants"
      restaurant_switch.id = "show-restaurant-switch";

      var theatre_switch = document.createElement("button");
      document.getElementById("control").appendChild(theatre_switch);
      theatre_switch.innerHTML = "Show Theatres";
      theatre_switch.id = "show-theatre-switch";

      var link = document.createElement("link"); // css for extra elements
      link.href = cssID;
      link.rel = "stylesheet";
      link.type = "text/css";
      document.head.appendChild(link);

      // load main only if geolocation is active
      var main_scr = document.createElement("script");
      document.getElementById("map").appendChild(main_scr);
      main_scr.type = "text/javascript";
      main_scr.src = "/js/main.js";

    }, function (error) {
      handleLocationError(error);
    });
  } else {
    var no_supportText = document.createElement("p");
    no_supportText.innerHTML = "application not supported by this browser.";
    document.body.appendChild(no_supportText);
  }
}

/*
 * handleLocationError()
 * error - an error
 * Deals with any geolocation-specific errors
 */
function handleLocationError(error) {
  var err_text = document.createElement("p");
  document.getElementById("control").appendChild(err_text);

  switch (error.code) {
    case error.PERMISSION_DENIED:
      var cat_204 = document.createElement("img");
      cat_204.src = src_204;
      document.getElementById("control").appendChild(cat_204); // no content
      break;
    case error.POSITION_UNAVAILABLE:
      err_text = "Location information is unavailable.";
      break;
    case error.TIMEOUT:
      err_text = "The request to get user location timed out.";
      break;
    case error.UNKNOWN_ERRON:
      err_text = "An unknown error occurred.";
      break;
  }

  console.log(error.code);
}

async function main() {
  var language = window.navigator.userLanguage || window.navigator.language;
  var map_load = document.createElement("script");
  document.getElementById("map").appendChild(map_load);
  map_load.type = "text/javascript";
  map_load.src = `https://maps.googleapis.com/maps/api/js?key=API&language=${language}&libraries=places`

  // give time for things to load, otherwise we get a 'google is not defined error'
  // timing could probably be refined
  console.log("Language: " + language);
  setTimeout(function () {
    initMap();
  }, 1000);
}

main();