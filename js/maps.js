   
function initMap() {
    var mapProp = {
        center: new google.maps.LatLng(53.2734, -7.7783),
        zoom: 2,
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

}