(function () {
    angular
        .module("WebAppMaker")
        .config(Configure);

    function Configure($routeProvider) {

        $routeProvider
            .when("/login", {
                templateUrl: 'views/user/login.view.client.html',
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
                templateUrl: 'views/user/user.view.client.html',
                controller: 'ProfileController',
                controllerAs: 'model',
                resolve: {
                    isLoggedIn: isLoggedIn
                }
            })
            .when("/register", {
                templateUrl: 'views/user/register.view.client.html',
                controller: 'RegisterController',
                controllerAs: 'model'
            })
            .when("/user/:uid/website", {
                templateUrl: 'views/website/website-list.view.client.html',
                controller: 'WebsiteListController',
                controllerAs: 'model',
                resolve: {
                    isLoggedIn: isLoggedIn
                }
            })
            .when("/user/:uid/website/new", {
                templateUrl: 'views/website/website-new.view.client.html',
                controller: 'NewWebsiteController',
                controllerAs: 'model',
                resolve: {
                    isLoggedIn: isLoggedIn
                }
            })
            .when("/user/:uid/website/:wid", {
                templateUrl: 'views/website/website-edit.view.client.html',
                controller: 'EditWebsiteController',
                controllerAs: 'model',
                resolve: {
                    isLoggedIn: isLoggedIn
                }
            })
            .when("/user/:uid/website/:wid/page", {
                templateUrl: 'views/page/page-list.view.client.html',
                controller: 'PageListController',
                controllerAs: 'model',
                resolve: {
                    isLoggedIn: isLoggedIn
                }
            })
            .when("/user/:uid/website/:wid/page/new", {
                templateUrl: 'views/page/page-new.view.client.html',
                controller: 'NewPageController',
                controllerAs: 'model',
                resolve: {
                    isLoggedIn: isLoggedIn
                }
            })
            .when("/user/:uid/website/:wid/page/:pid", {
                templateUrl: 'views/page/page-edit.view.client.html',
                controller: 'EditPageController',
                controllerAs: 'model',
                resolve: {
                    isLoggedIn: isLoggedIn
                }
            })
            .when("/user/:uid/website/:wid/page/:pid/order", {
                templateUrl: 'views/page/order-list.view.client.html',
                controller: 'OrderListController',
                controllerAs: 'model',
                resolve: {
                    isLoggedIn: isLoggedIn
                }
            })
            .when("/user/:uid/website/:wid/page/:pid/order/new", {
                templateUrl: 'views/page/page-modify.view.client.html',
                controller: 'ModifyPageController',
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
                    function(response) {
                        var user = response.data;
                        console.log(user);
                        if(user == '0') {
                            $rootScope.currentUser = null;
                            deferred.reject();
                            $location.url("/login");
                        } else {
                            $rootScope.currentUser = user;
                            deferred.resolve();
                        }
                    },
                    function(err) {
                        $location.url("/login");
                    }
                );

            return deferred.promise;
        }
    }


})();