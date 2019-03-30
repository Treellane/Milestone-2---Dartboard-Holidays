

/* ----------GOOGLE AUTOCOMPLTE / SEARCH INPUT FOR MAP------------------------*/

function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -33.86, lng: 151.209},
          //center: {lat: 47.0000, lng: 7.0000},
          zoom: 14,
          //zoom: 4,
        });

   // Create the search box and link it to the UI element.
        var input = document.getElementById('pac-input');

        var box = document.getElementById('input-box');
      
        map.controls.push(box);

        var autocomplete = new google.maps.places.Autocomplete(input);

      // Bind the map's bounds (viewport) property to the autocomplete object,
      // so that the autocomplete requests use the current map bounds for the
      // bounds option in the request.
        autocomplete.bindTo('bounds', map);

      // Set the data fields to return when the user selects a place.
        autocomplete.setFields(
            ['address_components', 'geometry', 'icon', 'name']);

var infowindow = new google.maps.InfoWindow();
        var infowindowContent = document.getElementById('infowindow-content');
        infowindow.setContent(infowindowContent);
        var marker = new google.maps.Marker({
          map: map,
          anchorPoint: new google.maps.Point(0, -29)
        });

        autocomplete.addListener('place_changed', function() {
          infowindow.close();
          marker.setVisible(false);
          var place = autocomplete.getPlace();
          if (!place.geometry) {
    // User entered the name of a Place that was not suggested and
    // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            return;
          }

    // If the place has a geometry, then present it on a map.
          if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
          } else {
            map.setCenter(place.geometry.location);
            map.setZoom(4);  
          }
          marker.setPosition(place.geometry.location);
          marker.setVisible(true);

          var address = '';
          if (place.address_components) {
            address = [
              (place.address_components[0] && place.address_components[0].short_name || ''),
              (place.address_components[1] && place.address_components[1].short_name || ''),
              (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
          }

          infowindowContent.children['place-icon'].src = place.icon;
          infowindowContent.children['place-name'].textContent = place.name;
          infowindowContent.children['place-address'].textContent = address;
          infowindow.open(map, marker);
        });

} //closing bracket for the initMap funcction

     
 
/* ------------------SELECT/DESELECT MAP MARKERS------------------------------*/

      
function showAccommidation() {
 alert("Hello world!");
 
 var NewMapCenter = map.getCenter();
  
  var mapLat = NewMapCenter.lat(); 
  var mapLng = NewMapCenter.lng();
  
  var map = new google.maps.Map(document.getElementById('map'), {
          center: {mapLat, mapLng},
          zoom: 3,
        });
  
  var infoWindow;
  infoWindow = new google.maps.InfoWindow();
       
        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
          radius: 2000,
          type: ['hotel']
        }, callback);
  
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
  



function hideAttraction() { 
  
}

function showBar() { 
  
}

function hideBar() { 
  
}

function showRestaurant() { 
  
}

function hideRestaurant() { 
  
}

function hideAccommidation() { 
  
}
        

function shwAccommidation() {
  
  var NewMapCenter = map.getCenter();
  
  var mapLat = NewMapCenter.lat(); 
  var mapLng = NewMapCenter.lng();
  
  var map = new google.maps.Map(document.getElementById('map'), {
          center: {mapLat, mapLng},
          zoom: 3,
        });
  
  var infoWindow;
  
  infoWindow = new google.maps.InfoWindow();
       
        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
          radius: 2000,
          type: ['hotel']
        }, callback);
  
  function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
        }
      }

      function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: placeLoc
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);
          infowindow.open(map, this);
        });
      }
 
}    