(function () {
    angular.module("TrafficPost")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService, $rootScope) {
        var cModel = this;

        cModel.login = login;

        /*      function callback(response, status) {
         if (status === google.maps.DirectionsStatus.OK) {
         //    directionsDisplay.set(response);
         console.log(response.routes[1].overview_polyline);
         var poly = response.routes[1].overview_polyline.replace(/\\/g, "\\\\");
         console.log("\n");
         console.log(poly);
         cModel.response = poly;
         } else {
         window.alert('Directions request failed due to ' + status);

         }
         }*/

        function login(userInput) {

            /*    UserService
             .testApi(callback);*/
            

            UserService
                .login(userInput)
                .then(function (response) {
                    var user = response.data;
                    if (user) {
                        $rootScope.currentUser = user;
                        $location.url("/user");
                    }
                    else {
                        cModel.error = "Username/Password is incorrect";
                    }
                })
                .catch(function (response) {
                    cModel.error = "Error Logging In!!";
                })
        }
    }

})();