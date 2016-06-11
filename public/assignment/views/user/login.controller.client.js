(function () {
    angular.module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {
        var cModel = this;

        cModel.login = login;

        function login(userInput) {
             UserService
                .findUserByCredentials(userInput.username, userInput.password)
                .then(function (response) {
                    var user = response.data;
                    if (user) {
                        $location.url("/user/" + user._id);
                    }
                    else {
                        cModel.error = "Username/Password is incorrect";
                    }
                })
                 .catch(function (response) {
                     cModel.error = "Something is wrong!!";
                 })
        }
    }

})();