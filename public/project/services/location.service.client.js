(function () {
    angular
        .module('TrafficPost')
        .factory("LocationService", LocationService);


    function LocationService($http) {
        api = {
            createLocation: createLocation,
            findLocationById: findLocationById,
            updateLocation: updateLocation,
            deleteLocation: deleteLocation,
            getDirectionRoutes: getDirectionRoutes,
            findAllLocations: findAllLocations
        }
        return api;

        function createLocation(userId, location) {
            var url = "/api/userP/" + userId + "/location";
            return $http.post(url, location);
        }

        function findLocationById(locationId) {
            var url = "/api/location/"+locationId;
            return $http.get(url);
        }

        function updateLocation(locId, location) {
           var url = "/api/location/"+locId;
           return  $http.put(url, location);
        }

        function deleteLocation(locId, userId){
            var url = "/api/userP/"+userId+"/location/"+locId;
            return $http.delete(url);
        }

        function getDirectionRoutes(startLocation, endLocation, callback){
            var directionsService = new google.maps.DirectionsService;
            directionsService.route({
                origin: startLocation.latlng,
                destination: endLocation.latlng,
                provideRouteAlternatives: true,
                travelMode: google.maps.TravelMode.DRIVING
            }, callback);
        }

        function findAllLocations() {
            var url = "/api/location";
            return $http.get(url);
        }

    }

})();