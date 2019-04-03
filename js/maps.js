
var map;
var markers = [];

/*---GOOGLE AUTOCOMPLTE / SEARCH INPUTtaken from Google Maps Paltform---------*/

function initAutocomplete() {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 15.0, lng: 0.0},
          zoom: 1,
          mapTypeId: 'roadmap'
        });

        // Create the search box and link it to the UI element.
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input); //this line causes errors!!!... if i remove
                                                                        // the [bracketed] section to allow me to moce the
                                                                        // input box to a different location!!!
     
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

      
  function showAttractions() {    alert("Test to see is funtion is entered!");
    
      
  // Getting the co-ords for the center of the map to use at a
  // starting point for searching and placing markers .... BUT CANT GET IT TO WORK!!! 
  
  //    var mapCenter = map.getCenter();
  //    var mapLat = mapCenter.lat(); 
  //    var mapLng = mapCenter.lng();
    
 //     var map = new google.maps.Map(document.getElementById('map'), {
 //         center: {mapLat, mapLng},
 //         zoom: 4,
  //      });
  
  
  
  // searching for HOTELS within a radius of 1000  
      var infoWindow;
      infoWindow = new google.maps.InfoWindow();
           
      var service = new google.maps.places.PlacesService(map);
          service.nearbySearch({
            location: location,
            radius: 1000,
            type: ['poi']
          }, callback);
    
    //plotting the results on the map
      function callback(results, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
              createMarker(results[i]);
            }
          }
        }
  
      function createMarker(place) {
 // var placeLoc = place.geometry.location;
         var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
          });
  
          google.maps.event.addListener(marker, 'click', function() {
            infoWindow.setContent(place.name);
            infoWindow.open(map, this);
          });
        }
  }    
  
  
  
  function hideAttractions() { 
    
  }
   
  function showAccommidation(){
    
  } 
  
  function hideAccommidation() { 
    
  }
  
  function showBar() {
  
  }
  
  
  function hideBar() { 
    
  }
  
  function showRestaurant() { 
    
  }
  
  function hideRestaurant() { 
    
  }
  
        
        
