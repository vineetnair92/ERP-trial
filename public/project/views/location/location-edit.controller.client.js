(function () {
    angular
        .module("TrafficPost")
        .controller("EditLocationController", EditLocationController);

    function EditLocationController($location, $routeParams, LocationService, UserService) {
        console.log("In location edit");
        var cModel = this;
        cModel.userId = $routeParams.uid;
        cModel.locationId = $routeParams.locId;
        cModel.updateLocation = updateLocation;
        cModel.deleteLocation = deleteLocation;
        init();

        function init() {
            LocationService
                .findLocationById(cModel.locationId)
                .then(function (response) {
                    cModel.location = response.data;
                    console.log(cModel.location);
                })
        }

        function updateLocation(location) {
                console.log(location);

                LocationService
                    .updateLocation(cModel.locationId, location)
                    .then(function (response) {
                        var updateStats = response.status;
                        if (updateStats === 200) {
                            $location.url("/user/" + cModel.userId + "/location");
                        }
                        else {
                            cModel.error = "Unable to update location";
                        }

                    })
                    .catch(function (response) {
                        cModel.error = "Unable to update location";
                    });
        }

        function deleteLocation(locId) {
            LocationService.deleteLocation(locId, cModel.userId)
                .then(function (response) {
                    var deleteStats = response.status;
                    if (deleteStats === 200) {
                        $location.url("/user/" + cModel.userId + "/location");
                    }
                    else {
                        cModel.error = "Unable to delete location";
                    }

                })
                .catch(function (response) {
                    cModel.error = "Unable to delete location";
                });
        }
    }
})();