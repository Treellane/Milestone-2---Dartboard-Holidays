

/*---GOOGLE AUTOCOMPLTE / SEARCH INPUT code taken from Google Maps Paltform---------*/
var map;

function initAutocomplete() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 20.0, lng: 10.0},
    zoom: 2,
    mapTypeId: 'roadmap'
  });

  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);  //REMOVING TOP_LEFT ALLOWS ME TO POSITION
                                                                  // SEARCH BOX WHERE I WANT, BUT THE
                                                                  // BOX STOPS WORKING PROPERLY!!!!!!!

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location,
       
      }));
     
     //THIS LINE IS PASSING THE CURRENT VIEWPORT LAT AND LNG TO THE FUNCTION!!!
      showMuseum(place.geometry.location.lat(),place.geometry.location.lng());
      showRestaurant(place.geometry.location.lat(),place.geometry.location.lng())
      showAccommidation(place.geometry.location.lat(),place.geometry.location.lng())
      showBar(place.geometry.location.lat(),place.geometry.location.lng())
      

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);

  });
  
}  // closing bracket of initAutocomplete function
     


/* ------------------SELECT/DESELECT MAP MARKERS------------------------------*/
  
document.getElementById("show-museum").addEventListener("click", showMuseum);
document.getElementById("show-accommidation").addEventListener("click", showAccommidation);
document.getElementById("show-bar").addEventListener("click", showBar);
document.getElementById("show-restaurant").addEventListener("click", showRestaurant);


  function showMuseum(currentLat,currentLng) { 

    var showLat = currentLat;
    var showLng = currentLng;

        console.log(showLat);
        console.log(showLng);

  var proxyUrl = "https://cors-anywhere.herokuapp.com/",
    //  targetUrl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+showLat+","+showLng+"&radius=9000&type=museum&key=AIzaSyB4pOM2KB-tNM3An1EVkIsVSYTY1jnKLWo"
  
  // This version works with ACTUAL CO-ORDINATES in it !!! but not when variables are uesd!!!   
    targetUrl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=53.34,-6.23&radius=9000&type=museum&key=AIzaSyB4pOM2KB-tNM3An1EVkIsVSYTY1jnKLWo";
 

  // DOING IT THIS WAY GIVES CORS ERRORS!!! WHAT EVEN CORS IS!!!  but proxy version above works!
  // let longString = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+museumLat+","+museumLng+"&radius=10000&type="+type+"&key=AIzaSyB4pOM2KB-tNM3An1EVkIsVSYTY1jnKLWo"
  //  fetch(longString) 
   
   fetch(proxyUrl + targetUrl)
    .then((res) => res.json())
    .then((data) => {
       
      console.log(data.results)
  //  console.log(data.results[0].geometry.location)

    for ( var i = 0; i < data.results.length; i++ )
			{ 
        var currentPosition = new google.maps.LatLng(data.results[i].geometry.location.lat,data.results[i].geometry.location.lng);
  
        console.log (data.results[i].geometry.location.lat,data.results[i].geometry.location.lng);
      
        var marker = new google.maps.Marker({
          position:  currentPosition,
          map: map,
          animation: google.maps.Animation.DROP
        });
       
      }
    });
  }
  
// nothing to see below this point, yet
// but soon hopefully


  function hideMuseum() { }
   

  function showAccommidation(currentLat,currentLng){
    console.log(currentLat +" "+ currentLng);
  }
      

  function hideAccommidation() { }
  
  function showBar (currentLat,currentLng) {
    console.log(currentLat +" "+ currentLng);

    }
     

  function hideBar() { }
  
  function showRestaurant(currentLat,currentLng) { 
    console.log(currentLat +" "+ currentLng);
}
  
  function hideRestaurant() { }
  




   