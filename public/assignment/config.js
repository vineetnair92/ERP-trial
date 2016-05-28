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
            .when("/profile", {
                templateUrl : 'views/user/profile.view.client.html'
            })
            .when("/register", {
                templateUrl : 'views/user/register.view.client.html'
            })
            .otherwise({
                redirectTo:'/'
            });
    }
})();