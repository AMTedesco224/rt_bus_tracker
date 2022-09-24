// This app tracks a single Boston bus route in real time from Bostons 
// MTBA api data and then displays the bus location as a marker on the map and 
// updates every 10 seconds
//////////////////////////////////////////////////////////////////////////////

// This array contains past and current locations of the bus
const busLocation = [];
// counter here represents the index of the current bus location
let counter = 0;
// this represents the map marker when updated and is initalized to null
let marker = null;


// Get longitude/latitude data from getBusLocation() and push to busLocation array
async function run() {
  const locations = await getBusLocations();
  console.log(new Date());
  // change the lon & lat variables "data[x]" value(1-10) to track a different bus
  const lon = parseFloat(JSON.stringify(data[0].attributes.longitude));
  const lat = parseFloat(JSON.stringify(data[0].attributes.latitude));
  busLocation.push([lon, lat]);
  console.log(lon, lat);
  createMarker();
  move();
}

// Request bus data from MBTA and return "data" value back to the run() function
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
    map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: busLocation[counter],
      zoom: 17,
    });
    marker = new mapboxgl.Marker()
      .setLngLat(busLocation[counter])
      .addTo(map);

  }
}

async function move() {

  ////////////////////////////////////////////////////////////////////////
  // This timer was a fix but not a very desireable one, for some reason 
  // my marker doesn't update it's location at the first iteration of the 
  // move() function so I used this timer to make it move every 10 seconds 
  // consistantly from the start
  let timer = 5000;
  if (counter >= 2) timer = 10000;
  // //////////////////////////////////////////////////////////////////////

  setTimeout(() => {
    if (counter >= busLocation.length) return;
    marker.setLngLat(busLocation[counter]);
    counter++;
    run();
  }, timer)
}



