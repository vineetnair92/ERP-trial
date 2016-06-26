(function () {
    angular.module("TrafficPost")
        .controller("AdminController", AdminController);

    function AdminController($routeParams, UserService, $location, $rootScope, LocationService, LocationPostService) {
        var cModel = this;
        cModel.adminId = $routeParams.uid;
        cModel.updateProfile = updateProfile;
        cModel.deleteUser = deleteUser;
        cModel.updateRow = 0;
        cModel.createUser = createUser;
        cModel.deleteUser = deleteUser;
        cModel.editUser = editUser;
        cModel.cancelUpdate = cancelUpdate;
        init();

        function init() {
            UserService
                .findAllUsers()
                .then(function (response) {
                    cModel.users = response.data;
                });

        }

        function createUser(user) {
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

        function registerUserAfterValidation(user) {

            UserService
                .register(user)
                .then(function (response) {
                    var user = response.data;
                    if (user) {
                        init();
                    }
                    else {
                        cModel.error = "Error creating user!!";
                    }
                })
                .catch(function (response) {
                    console.log("Error");

                });
        }

        function editUser(user) {
            cModel.user = {
                _id: user._id,
                username : user.username,
                firstName : user.firstName,
                lastName : user.lastName,
                email : user.email
            }

            cModel.updateRow = 1;
        }

        function updateProfile(user) {
            console.log(user);
            UserService
                .updateUser(user._id, user)
                .then(function (response) {
                    if (response.status === 200) {
                        cModel.updateRow = 0;
                        clearUserFields();
                        init();
                    }
                    else {
                        cModel.error = "error updating";
                    }
                })
                .catch(function (response) {
                    cModel.error = "error updating";
                })
        }

        function cancelUpdate() {
            clearUserFields();
            cModel.updateRow = 0;
        }

        function deleteUser(userId) {
            UserService
                .deleteUser(userId)
                .then(function (response) {
                    if (response.status === 200) {
                        cModel.deleteStats = "success";
                        init();
                    }
                    else {
                        cModel.deleteStats = "error";
                    }
                })
                .catch(function (response) {
                    cModel.deleteStats = "error";
                });
        }

        function clearUserFields() {
            cModel.user = {
                _id: '',
                username : '',
                firstName : '',
                lastName : '',
                email :''
            }
        }


    }

})();