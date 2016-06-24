(function () {
    angular
        .module("TrafficPost")
        .controller("LocationAddController", LocationAddController);

    var userLocationsAddError = "Error: not able to add location to user";

    function LocationAddController($location, $routeParams, LocationService, UserService) {
        var cModel = this;
        cModel.userId = $routeParams.uid;
        cModel.createLocation = createLocation;

        function createLocation(location) {
            console.log(location);
            if(location.optname.trim()!='') {
                location.name = location.optname;
            }
            LocationService
                .createLocation(cModel.userId, location)
                .then(
                    function (response) {
                        if (response.data) {
                            var locRef = response.data;
                                return UserService
                                    .addLocationForUser(cModel.userId, locRef);
                        }
                        else {
                            cModel.error = "Error Creating Location!!";
                        }
                    },
                    function (error) {
                        cModel.error = "Error Creating Location!!"
                        return error;
                    }
                )
                .then(
                    function (response) {
                        if(response.status == 200) {
                            $location.url("/user/" + cModel.userId + "/location");
                        }
                        else{
                            cModel.error = userLocationsAddError;
                        }
                    },
                    function (err) {
                        cModel.error = userLocationsAddError;
                    }
                )
        }
    }
})();