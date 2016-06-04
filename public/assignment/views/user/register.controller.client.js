(function () {
    angular.module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var cModel = this;
        cModel.createUser = createUser;
        function createUser(user) {

            if (user.password !== user.verifypassword) {
                cModel.error = "Verify Password Failed !!";
            }
            else {
                //cModel.createUserStats =
                    UserService
                        .createUser(user)
                        .then(function(response) {
                            var user =  response.data;
                            if (user) {
                                $location.url("/user/"+user._id);
                            }
                            else {
                                cModel.error = "Error creating user!!";
                            }
                        })
                        .catch(function (response) {
                            console.log("Error");

                        });
            }
        }
    }

})();