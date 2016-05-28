(function () {
    angular.module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {
        var cModel = this;

        cModel.login = login;

        function login(userInput) {
            var user = UserService.findUserByCredentials(userInput.username, userInput.password);
            if(user) {
               $location.url("/profile/"+user._id);
            }
            else {
                cModel.error = "Username/Password is incorrect";
            }

        }


    }

})();