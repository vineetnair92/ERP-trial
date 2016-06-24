(function () {
    angular.module("TrafficPost")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService, $location, $rootScope, LocationPostService) {
        var cModel = this;
        cModel.userId = $rootScope.currentUser._id;
        cModel.updateProfile = updateProfile;
        cModel.deleteUser = deleteUser;
        init();

        function init() {
            UserService
                .findUserById(cModel.userId)
                .then(function (response) {
                    cModel.user = response.data;
                });

        }

        function updateProfile(user) {
            console.log(user);
            UserService
                .updateUser(cModel.userId, user)
                .then(function (response) {
                    if (response.status === 200) {
                        cModel.updateStats = "success";
                    }
                    else {
                        cModel.updateStats = "error";
                    }
                })
                .catch(function (response) {
                    cModel.updateStats = "error";
                })

        }

        function deleteUser(userId) {
            UserService
                .deleteUser(userId)
                .then(function (response) {
                    if (response.status === 200) {
                        cModel.deleteStats = "success";
                        $location.url("/login");
                    }
                    else {
                        cModel.deleteStats = "error";
                    }
                })
                .catch(function (response) {
                    cModel.deleteStats = "error";
                });
        }


    }

})();