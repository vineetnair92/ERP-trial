(function () {
    angular.module("TrafficPost")
        .controller("UserHomeController", UserHomeController);

    function UserHomeController($routeParams, UserService, $location, $rootScope) {
        var cModel = this;
        cModel.userId = $rootScope.currentUser._id;

        cModel.logout = logout;

        init();

        function init() {
            UserService
                .findUserById(cModel.userId)
                .then(function (response) {
                    cModel.user = response.data;
                });

        }

        function logout() {
            UserService
                .logout()
                .then(
                    function (response) {
                        $rootScope.currentUser = null;
                        $location.url("/");
                    },
                    function(err) {
                      console.log(err);
                    }
                );
        }

    }

})();