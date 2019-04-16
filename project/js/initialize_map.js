const cssID = "/css/map_style.css";
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

      loadExtraElements();

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
  document.getElementById("map").appendChild(err_text);

  switch (error.code) {
    case error.PERMISSION_DENIED:
      var cat_204 = document.createElement("img");
      cat_204.src = src_204;
      document.getElementById("map").appendChild(cat_204); // no content
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

/*
 * loadExtraElements()
 * loads other elements to be displayed on the map
 */
function loadExtraElements() {
  // load extra elements only if geolocation is active
  var sidebar_switch = document.createElement("button");
  sidebar_switch.innerHTML = "→";
  sidebar_switch.id = "sidebar-switch";
  document.getElementById("map").appendChild(sidebar_switch);

  var center_button = document.createElement("button");
  center_button.innerHTML = "Center";
  center_button.id = "center-button";
  document.getElementById("map").appendChild(center_button);

  var show_switch = document.createElement("select"),
    show_restaurant = document.createElement("option"),
    show_theatre = document.createElement("option"),
    show_park = document.createElement("option"),
    show_gallery = document.createElement("option"),
    select_one = document.createElement("option");
  show_switch.id = "show-switch";
  document.getElementById("map").appendChild(show_switch);

  show_restaurant.innerHTML = "Show Restaurants";
  show_theatre.innerHTML = "Show Theatres";
  show_park.innerHTML = "Show Parks";
  show_gallery.innerHTML = "Show Galleries";
  select_one.innerHTML = "Select One...";
  show_switch.append(select_one, show_restaurant, show_theatre, show_park, show_gallery);

  var link = document.createElement("link"); // css for extra elements
  link.href = cssID;
  link.rel = "stylesheet";
  link.type = "text/css";
  document.head.appendChild(link);

  // load main only if geolocation is active
  var map_events_scr = document.createElement("script");
  document.getElementById("map").appendChild(map_events_scr);
  map_events_scr.type = "text/javascript";
  map_events_scr.src = "/js/map_events.js";
}

async function main() {
  var language = window.navigator.userLanguage || window.navigator.language;
  var map_load = document.createElement("script");
  document.getElementById("map").appendChild(map_load);
  map_load.type = "text/javascript";
  map_load.src = `https://maps.googleapis.com/maps/api/js?key=API_KEY&language=${language}&libraries=places`

  console.log("Language: " + language);
  window.onload = function () {
    initMap();
  }
}

main();