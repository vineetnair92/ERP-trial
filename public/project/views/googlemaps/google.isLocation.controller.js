(function () {
    angular
        .module("TrafficPost")
        .controller("isLocationController", isLocationController);

    function isLocationController($location, $routeParams, LocationService, UserService) {
        console.log("Is Location");
        var cModel = this;
        cModel.userId = $routeParams.uid;
        cModel.poly = $routeParams.poly;




    }
})();