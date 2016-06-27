(function () {
    angular
        .module("TrafficPost")
        .controller("LocationPostAddController", LocationPostAddController);


    function LocationPostAddController($location, $routeParams, LocationService, UserService, LocationPostService) {
        var cModel = this;
        cModel.userId = $routeParams.uid;
        cModel.locId = $routeParams.locId;
        cModel.createLocationPost = createLocationPost;

        init();

        function init() {
            LocationService
                .findLocationById(cModel.locId)
                .then(function (response) {

                    cModel.locName= response.data.name;
                },
                function (err) {
                    cModel.error = "Error fetching location name!";
                });
        }


        function createLocationPost(userId,  locId, location) {
            LocationPostService
                .createLocationPost(userId,  locId, location)
                .then(function (response) {
                    if(response.data) {
                        console.log("LocationPost Created Successfully");
                        $location.url("/user/"+cModel.userId+"/location/"+cModel.locId+"/locpost");
                    }
                },
                function (err) {
                    cModel.error = "Error Creating Location Post";
                })
        }
    }
})();