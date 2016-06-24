function IsLocationInPolyline(lat, lng, encodedPolyline) {
    var myPosition = new google.maps.LatLng(42.353785, -71.132255);
    var testPosition = new google.maps.LatLng(lat, lng);

    var encodePoints = encodedPolyline;
    var decodedPathPoints = google.maps.geometry.encoding.decodePath(encodePoints);
    var cascadiaFault = new google.maps.Polyline({
        path: decodedPathPoints
    });


    return google.maps.geometry.poly.isLocationOnEdge(testPosition, cascadiaFault, 0.00015)
        ? true
        : false;
}