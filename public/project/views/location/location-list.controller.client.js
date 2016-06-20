(function () {
    angular
        .module('TrafficPost')
        .controller("LocationListController", LocationListController);

    function LocationListController($routeParams, LocationService, UserService) {
        var cModel = this;
        cModel.userId = $routeParams.uid;
    

       init();

        function init() {
            UserService
                .findUserById(cModel.userId)
                .then(function (response) {
                    cModel.locations = response.data.locations;
                })
        }

    }

})();