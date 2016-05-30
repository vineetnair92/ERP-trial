(function () {
    angular.module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService) {
        var cModel = this;
        var currentUserId = $routeParams.uid;
        cModel.updateProfile = updateProfile;

        init();

        function init() {
            cModel.user = UserService.findByUserId(currentUserId);

        }
        
        function updateProfile(user) {
             console.log(user);
             cModel.updateStats = UserService.updateUser(currentUserId, user);
             
        }





    }

})();