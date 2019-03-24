

/* ----------GOOGLE AUTOCOMPLTE / SEARCH INPUT FOR MAP------------------------*/

function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -33.86, lng: 151.209},
          //center: {lat: 47.0000, lng: 7.0000},
          zoom: 13,
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
            map.setZoom(12);  // Why 12? Because it looks good.
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

     
 
/* ------------------SELECT/DESELECT MAP MARKERS------------------------------*/

// Add controls to the map, allowing users to hide/show features.
        var attractionsAlert = document.getElementById('attrations-selector');
        map.controls.push(attractionsAlert);
    
// Apply new JSON when the user chooses to hide/show features.
        document.getElementById('hide-poi').addEventListener('click', function() {
        map.setOptions({styles: styleAttraction['hideAttract']});
        });      
        document.getElementById('show-poi').addEventListener('click', function() {
        map.setOptions({styles: styleAttraction['showAttract']});
        });
       
       
       var restaurantAlert = document.getElementById('restaurant-selector');
        map.controls.push(restaurantAlert);  
        
        document.getElementById('hide-restaurant').addEventListener('click', function() {
        map.setOptions({styles: styleRest['hideRest']});
        });
        document.getElementById('show-restaurant').addEventListener('click', function() {
        map.setOptions({styles: styleRest['showRest']});
        }); 
        
       
        
        
        
} //closing bracket for the initMap funcction

/*variable to hide/show ATTRACTIONS on the map*/
  var styleAttraction = {
       hideAttract: [
          {
            featureType: 'poi.attraction',
            elementType: 'labels.icon',
            stylers: [{visibility: 'off'}]
          },
          {
            featureType: 'poi.park',
            elementType: 'labels.icon',
            stylers: [{visibility: 'off'}]
          },
          {
            featureType: 'poi.place_of_worship',
            elementType: 'labels.icon',
            stylers: [{visibility: 'off'}]
          }
        ],
        showAttract: [
          {
            featureType: 'poi.attraction',
            elementType: 'labels.icon',
            stylers: [{visibility: 'on'}]
          },
          {
            featureType: 'poi.park',
            elementType: 'labels.icon',
            stylers: [{visibility: 'on'}]
          },
          {
            featureType: 'poi.place_of_worship',
            elementType: 'labels.icon',
            stylers: [{visibility: 'on'}]
          }
        ]
      };
 

      
  var styleRest = {
       hideRest: [
          {
            featureType: 'restaurant',
            elementType: 'labels.icon',
            stylers: [{visibility: 'off'}]
          },
          {
            featureType: 'cafe',
            elementType: 'labels.icon',
            stylers: [{visibility: 'off'}]
          }
        ],
        showRest: [
          {
            featureType: 'restaurant',
            elementType: 'labels.icon',
            stylers: [{visibility: 'on'}]
          },
          {
            featureType: 'cafe',
            elementType: 'labels.icon',
            stylers: [{visibility: 'on'}]
          }
        ]
      };
      

