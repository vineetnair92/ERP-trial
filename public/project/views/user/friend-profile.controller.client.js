(function () {
    angular.module("TrafficPost")
        .controller("FriendProfileController", FriendProfileController);

    function FriendProfileController($routeParams, UserService, $location, $rootScope, LocationPostService) {
        var cModel = this;
        cModel.userId = $routeParams.uid;
        cModel.friendId = $routeParams.fid;

        init();

        function init() {
            UserService
                .findUserById(cModel.friendId)
                .then(function (response) {
                    cModel.user = response.data;
                    return LocationPostService.findAllLocationPostForUser(cModel.friendId);
                }, function (err) {
                    return err;
                })
                .then(function (response) {
                    if(response.data) {
                        cModel.noOfLocationPosts = response.data.length;
                    }
                },function (err) {
                    cModel.error = "Error Fetching User Info";
                });


        }
    }

})();