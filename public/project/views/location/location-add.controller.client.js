(function () {
    angular
        .module("TrafficPost")
        .controller("LocationAddController", LocationAddController);

    var userLocationsUpdateError = "Error updating website references in user";

    function LocationAddController($location, $routeParams, LocationService, UserService) {
        var cModel = this;
        cModel.userId = $routeParams.uid;
        cModel.createLocation = createLocation;

        function createLocation(location) {
            console.log(location);
            location.users = [cModel.userId];
            LocationService
                .createLocation(cModel.userId, location)
                .then(
                    function (response) {
                        if (response.data) {
                            var location = response.data;
                            var locRef = {
                                _id: location._id,
                                name: location.name
                            }
                            return UserService
                                     .addLocationForUser(cModel.userId, locRef);
                        }
                    },
                    function (error) {
                        cModel.error = "Error Creating Location!!"
                    }
                )
                .then(
                    function (response) {
                        if(response.status == 200) {
                            $location.url("/user/" + cModel.userId + "/location");
                        }
                        else{
                            cModel.error = "Error: not able to add location to user!!"
                        }
                    },
                    function (err) {
                        cModel.error = "Error: not able to add location to user!!"
                    }
                )
        }
    }
})();