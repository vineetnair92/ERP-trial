
function initAddlocation() {
    var marker;
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -33.8688, lng: 151.2195},
        zoom: 13,
        mapTypeControl: true,
        rotateControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.BOTTOM_CENTER
        }
    });
    var input = /** @type {!HTMLInputElement} */(
        document.getElementById('pac-input'));


    google.maps.event.addListener(map, 'click', function(e) {

        if(marker) {
            marker.setPosition(e.latLng);
        }
        else {
            marker = new google.maps.Marker({
                position: e.latLng,
                map: map
            });
        }
        $("#pac-input").val(marker.getPosition());

    });

    //  map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);
    //    map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(addButton);

    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);

    var infowindow = new google.maps.InfoWindow();
    var marker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29)
    });

    autocomplete.addListener('place_changed', function() {
        infowindow.close();
        marker.setVisible(false);
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            window.alert("Autocomplete's returned place contains no geometry");
            return;
        }
        else {
            console.log(place.geometry.location.lat() + "," + place.geometry.location.lng());
        }
        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);  // Why 17? Because it looks good.
        }
        marker.setIcon(/** @type {google.maps.Icon} */({
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(35, 35)
        }));
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);


        infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
        infowindow.open(map, marker);
    });
}