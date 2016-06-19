(function () {
    angular
        .module('TrafficPost')
        .controller("LocationListController", LocationListController);

    function LocationListController($routeParams, LocationService) {
        var cModel = this;
        cModel.userId = $routeParams.uid;
    

       // init();

        function init() {
            UserService
                .findLocationsByUser(cModel.userId)
                .then(function (response) {
                    cModel.locations = response.data;
                })
        }

    }

})();