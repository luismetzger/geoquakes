// define globals
var endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
var $quakesList;
var map;
var source = $('#earthquake-template').html();
var template = Handlebars.compile(source);

$.get(endpoint, function(data) {
  // console.log(data);
  var trackHTML = template({ quakes: data.features });
  var quakeResults = data.features;
  $('#info').append(trackHTML);
  // console.log(trackHTML);
  var coordinates = {};
  // Loop through all the date and set a parameter
  quakeResults.forEach(function(currQuakes) {
    console.log(currQuakes.geometry.coordinates[0] + currQuakes.geometry.coordinates[1] );
    var lang = currQuakes.geometry.coordinates[0];
    var long = currQuakes.geometry.coordinates[1];
    coordinates.lat = lang;
    coordinates.lng = long;
    // coordinates = {lat: lang, lng:long};
    var marker = new google.maps.Marker({
      position: coordinates,
      map: map,
    });
  });
});
//My Map - Must be called outside of the Ajax
function myMap() {
  map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 39.76, lng: -105.01},
          zoom: 1
        });
  }
myMap();
