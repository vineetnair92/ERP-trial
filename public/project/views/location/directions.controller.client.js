(function () {
    angular
        .module("TrafficPost")
        .controller("DirectionsController", DirectionsController);

    var directionsError = "Error fetching directions!";

    function DirectionsController($sce, $location, $routeParams, $scope, LocationService, UserService) {
        var cModel = this;
        cModel.userId = $routeParams.uid;
        cModel.searchRoutes = searchRoutes;
        cModel.getSafeHtml = getSafeHtml;
        init();
        
        function init() {
            console.log("CAME HERE");
            console.log($location.search());
            var queryParams = $location.search();
            if(queryParams.startLatLng && queryParams.endLatLng) {
                console.log("calling direction service");

                cModel.startLocation = {name: queryParams.startName, latlng: queryParams.startLatLng }
                cModel.endLocation = {name: queryParams.endName, latlng: queryParams.endLatLng }
              //  cModel.startLocation.name = queryParams.qParamsStartName;
               // cModel.endLocation.name = queryParams.qParamsEndName;
                LocationService
                    .getDirectionRoutes(cModel.startLocation, cModel.endLocation, routesCallback);
            }
        }




        function searchRoutes(startLocation, endLocation) {


              var qParamsStartLatLng="startLatLng="+startLocation.latlng;
              var qParamsEndLatLng="endLatLng="+endLocation.latlng;
              var qParamsStartName="startName="+startLocation.name;
              var qParamsEndName="endName="+endLocation.name;

              $location.url("/user/"+cModel.userId+"/go?"+qParamsStartName+"&"+qParamsStartLatLng+"&"+qParamsEndName+"&"+qParamsEndLatLng);
              console.log(startLocation, endLocation);


        }

        function routesCallback(response, status) {
            var poly;
            if (status === google.maps.DirectionsStatus.OK) {
                //    directionsDisplay.set(response);
           /*     console.log(response.routes[0].overview_polyline);
                poly = response.routes[0].overview_polyline;
                polycleaned = response.routes[0].overview_polyline.replace(/\\/g, "\\\\");
                console.log("\n");
                console.log(poly);
                cModel.response = poly;
                IsLocationInPolyline(42.34169, -71.09065, poly); // in
                IsLocationInPolyline(42.34656, -71.09015, poly); // out
                IsLocationInPolyline(42.34499, -71.09069, poly); // in
                IsLocationInPolyline(42.34388, -71.08994, poly); // in
                IsLocationInPolyline(42.34393, -71.08973, poly); // out
                IsLocationInPolyline(42.34656, -71.09015, poly); // out
                IsLocationInPolyline(42.34656, -71.09015, poly);
                IsLocationInPolyline(42.34656, -71.09015, poly);
                IsLocationInPolyline(42.34656, -71.09015, poly);
                IsLocationInPolyline(42.34656, -71.09015, poly);
                IsLocationInPolyline(42.34656, -71.09015, poly);
                IsLocationInPolyline(42.34656, -71.09015, poly);
                IsLocationInPolyline(42.34656, -71.09015, poly);
                IsLocationInPolyline(42.34656, -71.09015, poly);*/
                cModel.routes = response.routes;
                $scope.$apply();
            } else {
                poly = null;
                window.alert('Directions request failed due to ' + status);

            }
        }

        function getSafeHtml(step) {
            return $sce.trustAsHtml(step.instructions);
        }

    }
})();