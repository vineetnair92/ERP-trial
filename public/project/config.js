/**
 * Created by nasir on 5/27/16.
 */
(function () {
    angular
        .module("TrafficPost")
        .config(Configure);

    function Configure($routeProvider) {

        $routeProvider
            .when("/login", {
                templateUrl: 'views/user/login.html',
                controller: 'LoginController',
                controllerAs: 'model'
            })
            .when("/user/:uid/all", {
                templateUrl: 'views/user/user-friend-list.view.client.html',
                controller: 'UserFriendController',
                controllerAs: 'model',
                resolve: {
                    isLoggedIn: isLoggedIn
                }
            })
            .when("/user/:uid", {
                templateUrl: 'views/user/user.view.client.html',
                controller: 'ProfileController',
                controllerAs: 'model',
                resolve: {
                    isLoggedIn: isLoggedIn
                }
            })
            .when("/user", {
                templateUrl: 'views/user/userhome.view.client.html',
                controller: 'UserHomeController',
                controllerAs: 'model',
                resolve: {
                    isLoggedIn: isLoggedIn
                }
            })
            .when("/register", {
                templateUrl: 'views/user/register.html',
                controller: 'RegisterController',
                controllerAs: 'model',
                resolve: {
                    isLoggedIn: isLoggedIn
                }
            })
            .when("/user/:uid/go", {
                templateUrl: 'views/googlemaps/directions.view.client.html',
                controller: 'DirectionsController',
                controllerAs: 'model',
                resolve: {
                    isLoggedIn: isLoggedIn
                }
            })
            .when("/user/:uid/friend/:fid/profile", {
                templateUrl: 'views/user/friend-profile.view.client.html',
                controller: 'FriendProfileController',
                controllerAs: 'model',
                resolve: {
                    isLoggedIn: isLoggedIn,
                    isFriend : isFriend
                }
            })
            .when("/user/:uid/go/results", {
                templateUrl: 'views/location/directions-result.view.client.html',
                controller: 'DirectionsResultController',
                controllerAs: 'model',
                resolve: {
                    isLoggedIn: isLoggedIn
                }
            })
            .when("/user/:uid/isLocation/:poly", {
                templateUrl: 'views/googlemaps/google.isLocationOnEdge.html',
                controller: 'isLocationController',
                controllerAs: 'model',
                resolve: {
                    isLoggedIn: isLoggedIn
                }
            })
            .when("/user/:uid/location", {
                templateUrl: 'views/location/location-list.view.client.html',
                controller: 'LocationListController',
                controllerAs: 'model',
                resolve: {
                    isLoggedIn: isLoggedIn
                }

            })
            .when("/user/:uid/location/addlocation", {
                templateUrl: 'views/googlemaps/location-add.client.view.html',
                controller: 'LocationAddController',
                controllerAs: 'model',
                resolve: {
                    isLoggedIn: isLoggedIn
                }

            })
            .when("/user/:uid/location/:locId", {
                templateUrl: 'views/location/location-edit.view.client.html',
                controller: 'EditLocationController',
                controllerAs: 'model',
                resolve: {
                    isLoggedIn: isLoggedIn
                }
            })
            .when("/user/:uid/location/:locId/locpost", {
                templateUrl: 'views/location/locationpost-list.view.client.html',
                controller: 'LocationPostListController',
                controllerAs: 'model',
                resolve: {
                    isLoggedIn: isLoggedIn
                }
            })
            .when("/user/:uid/location/:locId/locpost/addlocationpost", {
                templateUrl: 'views/location/locationpost-add.view.client.html',
                controller: 'LocationPostAddController',
                controllerAs: 'model',
                resolve: {
                    isLoggedIn: isLoggedIn
                }
            })
            .otherwise({
                redirectTo: '/login'
            });

        function isLoggedIn(UserService, $location, $q, $rootScope) {

            var deferred = $q.defer();

            UserService
                .isLoggedIn()
                .then(
                    function (response) {
                        var user = response.data;
                        console.log(user);
                        if (user == '0') {
                            $rootScope.currentUser = null;
                            deferred.reject();
                            $location.url("/login");
                        } else {
                            $rootScope.currentUser = user;
                            deferred.resolve();
                        }
                    },
                    function (err) {
                        $location.url("/login");
                    }
                );

            return deferred.promise;
        }

        function isFriend(UserService, $location, $q, $rootScope, $route) {

            var deferred = $q.defer();
            var userId =  $route.current.params.uid;
            var friendId =  $route.current.params.fid;

            UserService
                .findUserById(userId)
                .then(
                    function (response) {
                        var user = response.data;
                        var isFriend = false;
                        user.friends.forEach(function (friend) {
                            if(friend._id == friendId) {
                                isFriend = true;
                            }
                        });
                        if (!isFriend) {
                            deferred.reject();
                            $location.url("/user/"+userId+"/all");
                        } else {
                            deferred.resolve();
                        }
                    },
                    function (err) {
                        $location.url("/user/"+userId+"/all");
                    }
                );

            return deferred.promise;
        }
    }
})();