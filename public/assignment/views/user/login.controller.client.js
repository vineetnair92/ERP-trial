(function () {
    angular.module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService, $rootScope) {
        var cModel = this;

        cModel.login = login;

        function login(userInput) {
            UserService
                .login(userInput)
                .then(function (response) {
                    var user = response.data;
                    if (user) {
                        $rootScope.currentUser = user;
                        $location.url("/user");
                    }
                    else {
                        cModel.error = "Username/Password is incorrect";
                    }
                })
                .catch(function (response) {
                    cModel.error = "Something is wrong!!";
                })
        }

        function testApi() {
            UserService
                .testApi()
                .then(
                    function (response) {

                    },
                    function (err) {

                    });
        }
    }

})();