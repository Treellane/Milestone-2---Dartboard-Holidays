

/* ----------GOOGLE AUTOCOMPLTE / SEARCH INPUT FOR MAP------------------------*/

function initAutocomplete() {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 47.8688, lng: -33.3242},
          zoom: 4,
          mapTypeId: 'roadmap'
        });

        // Create the search box and link it to the UI element.
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
      
       // map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(input);  THIS LINE OF CODE SEEMS TO LOCATE THE 'SEARCH WINDOW' WITHIN
                                                                              // THE MAP!!! WHICH I DONT WANT! BLOCKEING IT OUT APPEARS TO 
                                                                              // MAKE MY SEARCH BAR APPEAR WHERE I WANT IT TO!!! 

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
              position: place.geometry.location
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
      }
      
/* ------------------SELECT/DESELECT MAP MAKRERS------------------------------*/

// Add controls to the map, allowing users to hide/show features.
  var styleControl = document.getElementById('style-selector-control-1');
 
 push(styleControl);
 
  
// Apply new JSON when the user chooses to hide/show features.
        document.getElementById('hide-poi').addEventListener('click', function() {
          map.setOptions({styles: style['hide']});
        });
        document.getElementById('show-poi').addEventListener('click', function() {
          map.setOptions({styles: style['default']});
        });
  
      
var style = {
        default: null,
        hide: [
          {
            featureType: 'poi.attraction',
            stylers: [{visibility: 'off'}]
          },
          {
            featureType: 'poi.park',
            stylers: [{visibility: 'off'}]
          },
          {
            featureType: 'poi.place_of_worship',
            stylers: [{visibility: 'off'}]
          }
        ]
      };
        