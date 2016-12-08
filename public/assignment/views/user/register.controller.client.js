(function () {
    angular.module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService, CompanyListService) {
        var cModel = this;
        cModel.createUser = createUser;

        function createUser(user) {
            if (!user.password || (user.password !== user.verifypassword)) {
                cModel.error = "Password Empty / Verify Password Failed !!";
            }
            else {
                if (user.usertype === "Customer") {
                    ValidateCompanyandRegister(user);
                }
                else {
                    UserService
                        .findUserByUsername(user.username)
                        .then(function (response) {
                            if (!response.data) {
                                registerUserAfterValidation(user);
                            }
                            else {
                                cModel.error = "Username already exists, Please enter another username !!";
                            }
                        });
                }
            }
        }


        function ValidateCompanyandRegister(user) {
            CompanyListService.findCompanyExists(user.company)
                .then(function (res) {
                    if (res.data) {
                        UserService
                            .findUserByUsername(user.username)
                            .then(function (response) {
                                if (!response.data) {
                                    registerUserAfterValidation(user);
                                }
                                else {
                                    cModel.error = "Username already exists, Please enter another username !!";
                                }
                            });
                    }
                }).catch(function (response) {
                console.log("No such company exist");
            });
        }


        function registerUserAfterValidation(user) {
            UserService
                .register(user)
                .then(function (response) {
                    var user = response.data;
                    if (user && user.usertype == "Customer") {
                        console.log(user.websites.name);
                        $location.url("/customer/" + user._id);
                    }
                    else if (user && user.usertype == "Staff") {
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