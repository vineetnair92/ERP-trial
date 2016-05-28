(function () {
    angular.module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var cModel = this;
        cModel.createUser = createUser;
        function createUser(user) {
            cModel.createUserStats = UserService.createUser(user);
            if(cModel.createUserStats) {
                $location.url("/");
            }
        }
    }

})();