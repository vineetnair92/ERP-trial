function initDirectionsSearch() {
    console.log("YESSS");
    var start_input = /** @type {!HTMLInputElement} */(document.getElementById('start_input'));
    var end_input = /** @type {!HTMLInputElement} */(document.getElementById('end_input'));

    console.log("V === "+$("#start_input").val());
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
            $("#start_input_name").val(start_place.formatted_address);
            $("#start_input").trigger('input');

            $("#startlatLng").val(start_place.geometry.location.lat() + "," + start_place.geometry.location.lng());
            $("#startlatLng").trigger('input');

            var startCity, startState, startCountry;
            start_place.address_components.forEach(function (comp, index) {
                comp.types.forEach(function (type) {
                    if(type == 'locality') {
                        startCity = comp.long_name;
                    }
                    if(type == 'administrative_area_level_1') {
                        startState = comp.long_name;
                    }
                    if(type == 'country') {
                        startCountry = comp.long_name;
                    }
                })

            });
            $("#startCity").val(startCity);
            $("#startCity").trigger("input");

            $("#startState").val(startState);
            $("#startState").trigger("input");

            $("#startCountry").val(startCountry);
            $("#startCountry").trigger("input");
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
            $("#end_input_name").val(end_place.formatted_address);
            $("#end_input").trigger('input');

            $("#endlatLng").val(end_place.geometry.location.lat() + "," + end_place.geometry.location.lng());
            $("#endlatLng").trigger('input');

            var endCity, endState, endCountry;
            end_place.address_components.forEach(function (comp, index) {
                comp.types.forEach(function (type) {
                    if(type == 'locality') {
                        endCity = comp.long_name;
                    }
                    if(type == 'administrative_area_level_1') {
                        endState = comp.long_name;
                    }
                    if(type == 'country') {
                        endCountry = comp.long_name;
                    }
                })

            });
            $("#endCity").val(endCity);
            $("#endCity").trigger("input");

            $("#endState").val(endState);
            $("#endState").trigger("input");

            $("#endCountry").val(endCountry);
            $("#endCountry").trigger("input");
        }
    });

}