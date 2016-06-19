(function () {
    angular
        .module("TrafficPost")
        .controller("LocationAddController", LocationAddController);

    var userLocationsUpdateError = "Error updating website references in user";

    function LocationAddController($location, $routeParams, LocationService, UserService) {
        var cModel = this;
        cModel.userId = $routeParams.uid;
        cModel.createLocation = createLocation;
        cModel.addLocation = addLocation;
        function createLocation(location) {
            LocationService
                .createLocation(cModel.userId, location)
                .then(
                    function (response) {
                        if(response.data) {
                            $location.url("/user/"+cModel.userId+"/location");
                        }
                    },
                    function (error) {
                        cModel.error = "Error Creating Location!!"
                    }
                );
        }

        function addLocation(location) {
            console.log(location);
        }


    }
})();