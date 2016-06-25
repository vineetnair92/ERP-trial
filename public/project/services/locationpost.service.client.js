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
            findLocationPostById: findLocationPostById,
            deleteLocationPost: deleteLocationPost,
            endorsePost: endorsePost,
            unendorsePost: unendorsePost

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

        function findLocationPostById(locPostId) {
            var url ="/api/locationpost/"+locPostId;
            return $http.get(url);
        }


        function deleteLocationPost(locPostId) {
            var url = "/api/locationpost/"+locPostId;
            return $http.delete(url);   
        }

        function endorsePost(locPostId, userId) {
            var url = "/api/userP/"+userId+"/locationpost/"+locPostId+"/endorse";
            return  $http.put(url);
        }
        
        function unendorsePost(locPostId, userId) {
            var url = "/api/userP/"+userId+"/locationpost/"+locPostId+"/unendorse";
            return  $http.delete(url);
            
        }

        function findLocationById(locationId) {
            var url = "/api/location/"+locationId;
            return $http.get(url);
        }

        function updateLocation(locId, location) {
           var url = "/api/location/"+locId;
           return  $http.put(url, location);
        }


    }

})();