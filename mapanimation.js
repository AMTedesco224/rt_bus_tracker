// This app tracks a single Boston bus route in real time from Bostons 
// MTBA api data and then displays the bus location as a marker on the map and 
// updates every 15 seconds


// This array contains past and current locations of the bus
const busLocation = [];
let counter = 0;
let marker = null;

// Get longitude/latitude data from getBusLocation() and push to busLocation array
async function run() {
  const locations = await getBusLocations();
  console.log(new Date());
  const lon = parseFloat(JSON.stringify(data[0].attributes.longitude));
  const lat = parseFloat(JSON.stringify(data[0].attributes.latitude));
  busLocation.push([lon, lat]);
  console.log(lon);
  console.log(lat);
  console.log(busLocation);
  createMarker();
  move();
}

// Request bus data from MBTA
async function getBusLocations() {
  const url = "https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip";
  const response = await fetch(url);
  const json = await response.json();
  return data = Array.from(json.data);
}

// TODO: add your own access token
mapboxgl.accessToken = 'pk.eyJ1IjoiYW10ZWRlc2NvIiwiYSI6ImNsN3RkeXV3NzA0c3Izb285ajd4MjA3am4ifQ.NdnEYNZDBvUkd7Y509SiYA';

// This is the map instance
let map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-71.058880, 42.359554],
  zoom: 12.8,
});

// Adds a marker to the map at the first iteration of busLocation array
function createMarker() {
  if (counter === 0) {
    marker = new mapboxgl.Marker()
      .setLngLat(busLocation[counter])
      .addTo(map);
  }
}

// counter here represents the index of the current bus location
async function move() {
  setTimeout(() => {
    if (counter >= busLocation.length) return;
    marker.setLngLat(busLocation[counter]);
    counter++;
    run();
  }, 15000)
}


