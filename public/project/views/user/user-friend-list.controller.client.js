(function () {
    angular.module("TrafficPost")
        .controller("UserFriendController", UserFriendController);

    function UserFriendController($scope,$routeParams, UserService, $location, $rootScope, LocationPostService) {
        var cModel = this;
        cModel.userId = $routeParams.uid;
        cModel.followUser = followUser;
        cModel.unFollowUser = unFollowUser;
        cModel.isFriend = isFriend;
        var currentUser = null;

        init();
        findCurrentUser(cModel.userId);
        function init() {
            UserService
                .findAllUsers(cModel.userId)
                .then(function (response) {
                    if(response.data) {
                        cModel.users = response.data;
                    }
                    else {
                        cModel.error = "Error fetching users";
                    }
                }, function (err) {
                    cModel.err = "Error fetching users"
                });
        }

        function findCurrentUser(userId) {
            UserService
                .findUserById(userId)
                .then(function (response) {
                    if(response) {
                        currentUser = response.data;
                    }
                    else {
                        cModel.error = "Error fetching details of current user";

                    }
                }, function (err) {
                    cModel.error = "Error fetching details of current user";
                });
        }
        
        function followUser(friend) {
            UserService
                .addUserForUser(cModel.userId, friend)
                .then(function (response) {
                    if(response.status == 200) {
                        findCurrentUser(cModel.userId);
                        init();
                    }
                    else {
                        cModel.error("Error Following User!! Something went wrong");
                    }
                });
        }

        function unFollowUser(friend) {
            UserService
                .removeUserFromUser(cModel.userId, friend._id)
                .then(function (response) {
                    if(response.status == 200) {
                        findCurrentUser(cModel.userId);
                        init();
                    }
                    else {
                        cModel.error("Error UnFollowing User!! Something went wrong");
                    }
                });
        }

        function isFriend(userId) {
            if(currentUser) {
                var isFriend = false;
                currentUser.friends.forEach(function (friend) {
                    if(userId == friend._id) {
                        isFriend = true;
                    }
                });
                return isFriend;
            }
        }
    }

})();