function initDirectionsSearch() {
    console.log("YESSS");
    var start_input = /** @type {!HTMLInputElement} */(document.getElementById('start_input'));
    var end_input = /** @type {!HTMLInputElement} */(document.getElementById('end_input'));


    var autocomplete_s = new google.maps.places.Autocomplete(start_input);
    var autocomplete_e = new google.maps.places.Autocomplete(end_input);


    autocomplete_s.addListener('place_changed', function() {
        var start_place = autocomplete_s.getPlace();
        if (!start_place.geometry) {
            window.alert("Autocomplete's Start Location returned place contains no geometry");
            return;
        }
        else {
            console.log(start_place.geometry.location.lat() + "," + start_place.geometry.location.lng());
        }
    });

    autocomplete_e.addListener('place_changed', function() {
        var end_place = autocomplete_e.getPlace();
        if (!end_place.geometry) {
            window.alert("Autocomplete's End Location returned place contains no geometry");
            return;
        }
        else {
            console.log(end_place.geometry.location.lat() + "," + end_place.geometry.location.lng());
        }
    });

}