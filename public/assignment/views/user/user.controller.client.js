(function () {
    angular.module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService) {
        var cModel = this;
        var currentUserId = $routeParams.uid;
        cModel.updateProfile = updateProfile;

        init();

        function init() {
            UserService
                .findByUserId(currentUserId)
                .then(function (response)  {
                    cModel.user = response.data;
                });

        }

        function updateProfile(user) {
            console.log(user);
            cModel.updateStats = UserService.updateUser(currentUserId, user);

        }


    }

})();