const centerButton = document.getElementById("center-button");
const show_switch = document.getElementById("show-switch");
const sidebar_switch = document.getElementById("sidebar-switch");
const user_loc = new google.maps.LatLng(initLat, initLng); // user's initial location
const university_loc = new google.maps.LatLng(52.1334, -106.6314); // university of saskatchewan
var service;
var markers = []; // list of markers on map
var isMarked = false;
var isClosed = true; // if the sidebar is closed, true

/*
 * createMarker() 
 * place a location defined by Google Places
 * places a marker on the map, at a specific place location
 */
function createMarker(place) {
  var request = {
    placeId: place.place_id
  };
  var marker = new google.maps.Marker({
    animation: google.maps.Animation.DROP,
    map: map,
    position: place.geometry.location
  });
  markers.push(marker);

  // get extra details about a place
  // if no extra found, print without them
  service.getDetails(request, function (details, status) {
    var rating = "No rating.";
    if (details) {
      if (details.rating != undefined) rating = details.rating + "/5";
      var content = "<b>" + details.name + "</b>" +
        "<br>" +
        "Rating: " + rating + "<br>" +
        details.formatted_phone_number + "<br>" +
        details.vicinity;
    } else {
      if (place.rating != undefined) rating = place.rating + "/5";
      var content = "<b>" + place.name + "</b>" +
        "<br>" +
        "Rating: " + rating + "<br>" +
        place.vicinity;
    }

    google.maps.event.addListener(marker, 'click', function () {
      infowindow.setContent(content);
      infowindow.open(map, this);
    });

  });
}

/*
 * callback() 
 * places all locations within specified distance on the map
 *  but only if they are open
 */
function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    if (isMarked) { // remove markers before placing them again
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      markers = [];
    }

    for (var i = 0; i < results.length; i++) {
      if (results[i].opening_hours) createMarker(results[i]);
    }

    isMarked = true;
  }
}


/*
 * Move Sidebar
 */
sidebar_switch.addEventListener("click", function (event) {
  if (isClosed) { // open sidebar
    document.getElementById("sidebar").style.display = "block";
    event.target.innerHTML = "←";
    event.target.style.left = "25%";

    centerButton.style.left = "25.5%";
    show_switch.style.left = "calc(25.5% + 75px)" || "-moz-calc(25.5% + 75px)";

    isClosed = false;
  } else { // close sidebar
    document.getElementById("sidebar").style.display = "none";
    event.target.innerHTML = "→";
    event.target.style.left = "0%";

    centerButton.style.left = "200px";
    show_switch.style.left = "275px";

    isClosed = true;
  }
});


/* 
 * Center Button 
 * centers back on the user's location
 */

// handles boldification of 'Center'
centerButton.addEventListener("mouseenter", function (event) {
  event.target.style.border = "thin solid #808080";
}, false);
centerButton.addEventListener("mouseleave", function (event) {
  event.target.style.border = "none";
}, false);

centerButton.addEventListener("click", function (event) {
  map.setCenter(user_loc);
});

/*
 * Show Item
 */

/*
// gets a number of *open* theatres and places markers on them
theatreButton.addEventListener("click", function (event) {
  event.target.style.fontWeight = 500; // make it look pressed
  var request = {
    location: user_loc,
    radius: 10000, // meters
    type: ['movie_theater'],
  };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}, false); */

/* 
 * Show Restaurants Button 
 */
/*
//handles boldification of 'Show Restaurants'
restaurantButton.addEventListener("mouseenter", function (event) {
  event.target.style.fontWeight = "bold";
}, false);
restaurantButton.addEventListener("mouseleave", function (event) {
  event.target.style.fontWeight = "normal";
}, false);

// gets a number of *open* restaurants and places markers on them
restaurantButton.addEventListener("click", function (event) {
  event.target.style.fontWeight = 500; // make it look pressed
  var request = {
    location: user_loc,
    radius: 1200, // meters
    type: ['restaurant'],
  };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}, false); */