(function () {
    angular.module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var cModel = this;
        cModel.createUser = createUser;


        function createUser(user) {

            if (!user.password || (user.password !== user.verifypassword)) {
                cModel.error = "Password Empty / Verify Password Failed !!";
            }
            else {
                UserService
                    .findUserByUsername(user.username)
                    .then(function (response) {
                        if (!response.data) {
                            createUserAfterValidation(user);
                        }
                        else {
                            cModel.error = "Username already exists, Please enter another username !!";
                        }
                    });
            }
        }

        function createUserAfterValidation(user) {

            UserService
                .createUser(user)
                .then(function (response) {
                    var user = response.data;
                    if (user) {
                        $location.url("/user/" + user._id);
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

})();