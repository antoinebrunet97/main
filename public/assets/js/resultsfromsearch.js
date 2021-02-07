let map;
// array of markers
let markers = [];
// indicates whether all the markers appear on the map
let markersIsFull = true;
let places;
let infoWindow;
let autocomplete;
let placeTwo;
let searchImage;
const countryRestrict = { country: "us" };
const MARKER_PATH =
  "https://developers.google.com/maps/documentation/javascript/images/marker_green";

const hostnameRegexp = new RegExp("^https?://.+?/");

// Map is initially centered to North America coordinates
const countries = {
  address: {
    // Initial coordinates of the map
    center: { lat: 45.508888, lng: -73.561668 },
    zoom: 11,
  },
};

// Initialize google map API
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: countries["address"].zoom,
    center: countries["address"].center,
    mapTypeControl: false,
    panControl: false,
    zoomControl: true,
    streetViewControl: false,
    styles: mapstyling,
  });

  // For loop of all libraries
  for (i = 0; i < libraries.length; i++) {
    latVal = libraries[i].latitude;
    lngVal = libraries[i].longitude;
    latlng = { lat: latVal, lng: lngVal };
    libraryName = libraries[i].name;
    addressPart1 = libraries[i].addressPart1;
    addressPart2 = libraries[i].addressPart2;
    phoneNumberPart1 = libraries[i].phoneNumberPart1;
    phoneNumberPart2 = libraries[i].phoneNumberPart2;
    let contentString =
    '<p>' + libraryName + '</p>' +
    '<p>Adresse:</p>' +
    '<p>' + addressPart1 + '</p>' +
    '<p>' + addressPart2 + '</p>' +
    '<p>Téléphone:</p>' +
    '<p>' + phoneNumberPart1 + '</p>';
    if (!(phoneNumberPart2 === "")) {
      contentString += '<p>' + phoneNumberPart2 + '</p>';
    }
    // info window
    const infowindow = new google.maps.InfoWindow({
      content: contentString,
    });
    // marker
    const marker = new google.maps.Marker({
      position: latlng,
      map,
      // title: libraryName,
      clickable: true,
    });
    // the info window opens on click
    marker.addListener("click", () => {
      infowindow.open(map, marker);
    });
    markers.push(marker)
  }

  // updates the markers
  function updateMarkers() {
    // neighborhood
    neighborhood = document.getElementById("neighborhood").value;
    if (neighborhood === "All neighborhoods") {
      // makes all the markers appear
      for (let i = 0; i < libraries.length; i++) {
          markers[i].setMap(map);
          markersIsFull = true;
      }
    } else {
      if (!markersIsFull) {
        // makes the appropriate markers appear
        for (let i = 0; i < libraries.length; i++) {
          libraryName = libraries[i].neighborhood;
          if (libraryName === neighborhood) {
            markers[i].setMap(map);
          }
        }
      }
      // makes the other markers disappear
      for (let i = 0; i < libraries.length; i++) {
        libraryName = libraries[i].neighborhood;
        if (!(libraryName === neighborhood)) {
          markers[i].setMap(null);
          markersIsFull = false;
        }
      }
    }
  }

  document.getElementById("neighborhood").onchange=updateMarkers;
}