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
                controllerAs: 'model'
            })
            .when("/user/:uid/go", {
                templateUrl: 'views/googlemaps/directions.view.client.html',
            
            })
            .when("/user/:uid/location", {
                templateUrl: 'views/location/location-list.view.client.html',
                controller: 'LocationListController',
                controllerAs: 'model'

            })
            .when("/user/:uid/location/addlocation", {
                templateUrl: 'views/googlemaps/location-add.client.view.html',
                controller: 'LocationAddController',
                controllerAs: 'model'

            })
            .when("/user/:uid/website/new", {
                templateUrl: 'views/website/website-new.view.client.html',
                controller: 'NewWebsiteController',
                controllerAs: 'model'
            })
            .when("/user/:uid/website/:wid", {
                templateUrl: 'views/website/website-edit.view.client.html',
                controller: 'EditWebsiteController',
                controllerAs: 'model'
            })
            .when("/user/:uid/website/:wid/page", {
                templateUrl: 'views/page/page-list.view.client.html',
                controller: 'PageListController',
                controllerAs: 'model'
            })
            .when("/user/:uid/website/:wid/page/new", {
                templateUrl: 'views/page/page-new.view.client.html',
                controller: 'NewPageController',
                controllerAs: 'model'
            })
            .when("/user/:uid/website/:wid/page/:pid", {
                templateUrl: 'views/page/page-edit.view.client.html',
                controller: 'EditPageController',
                controllerAs: 'model'
            })
            .when("/user/:uid/website/:wid/page/:pid/widget", {
                templateUrl: 'views/widget/widget-list.view.client.html',
                controller: 'WidgetListController',
                controllerAs: 'model'
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/new", {
                templateUrl: 'views/widget/widget-chooser.view.client.html',
                controller: 'NewWidgetController',
                controllerAs: 'model'

            })
            .when("/user/:uid/website/:wid/page/:pid/widget/:wgid", {
                templateUrl: 'views/widget/widget-edit.view.client.html',
                controller: 'EditWidgetController',
                controllerAs: 'model'
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/:wgid/flickr", {
                templateUrl: 'views/widget/widget-flickr-search.view.client.html',
                controller: 'FlickrSearchController',
                controllerAs: 'model'
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
    }
})();