/**
 * Created by nasir on 5/27/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .config(Configure);
    
    function Configure($routeProvider) {

        $routeProvider
            .when("/", {
              templateUrl : 'views/user/login.view.client.html',
              controller : 'LoginController',
              controllerAs : 'model'
            })
            .when("/user/:uid", {
                templateUrl : 'views/user/profile.view.client.html',
                controller : 'ProfileController',
                controllerAs: 'model'
         
            })
            .when("/register", {
                templateUrl : 'views/user/register.view.client.html',
                controller : 'RegisterController',
                controllerAs: 'model'
            })
            .when("/user/:uid/website", {
                templateUrl : 'views/website/website-list.view.client.html',
                controller : 'WebsiteListController',
                controllerAs: 'model'
            })
            .when("/user/:uid/website/new", {
                templateUrl : 'views/website/website-new.view.client.html',
                controller : 'NewWebsiteController',
                controllerAs: 'model'
            })
            .when("/user/:uid/website/:wid", {
                templateUrl : 'views/website/website-edit.view.client.html',
                controller : 'EditWebsiteController',
                controllerAs: 'model'
            })
            .otherwise({
                redirectTo:'/'
            });
    }
})();