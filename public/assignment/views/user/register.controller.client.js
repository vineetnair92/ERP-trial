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
                    console.log(res.data);
                    if (res.data.length && res.data.length> 0) {
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
                    else {
                            cModel.error="No such company!";
                    }

                });
        }


        function registerUserAfterValidation(user) {
            UserService
                .register(user)
                .then(function (response) {
                    var user = response.data;
                    if (user && user.usertype == "Customer") {
                        console.log(user._id);
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