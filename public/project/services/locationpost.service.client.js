(function () {
    angular
        .module('TrafficPost')
        .factory("LocationPostService", LocationPostService);


    function LocationPostService($http) {
        api = {
            createLocationPost: createLocationPost,
            findAllLocationPostForUserLocation: findAllLocationPostForUserLocation,
            findAllLocationPostForLocations: findAllLocationPostForLocations,
            findAllLocationPostForUser: findAllLocationPostForUser,
            deleteLocationPost: deleteLocationPost
           /* findLocationById: findLocationById,
            updateLocation: updateLocation,
            deleteLocation: deleteLocation,
            getDirectionRoutes: getDirectionRoutes*/
        }
        return api;

        function createLocationPost(userId, locId, locationPost) {
            var url = "/api/userP/" + userId + "/location/"+locId+"/locationpost";
            return $http.post(url, locationPost);
        }
        
        function findAllLocationPostForUserLocation(userId, locId) {
            var url = "/api/userP/" + userId + "/location/"+locId+"/locationpost";
            return $http.get(url);
        }

        function findAllLocationPostForLocations(locationIds) {
            var url = "/api/locationpost";
            return $http.post(url, locationIds);
        }

        function findAllLocationPostForUser(userId) {
            var url = "/api/userP/" + userId + "/locationpost";
            return $http.get(url);
        }


        function deleteLocationPost(locPostId) {
            var url = "/api/locationpost/"+locPostId;
            return $http.delete(url);   
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
            }, callback);}


    }

})();