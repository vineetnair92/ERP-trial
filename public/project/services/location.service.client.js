(function () {
    angular
        .module('TrafficPost')
        .factory("LocationService", LocationService);


    function LocationService($http) {
        api = {
            createLocation: createLocation,
            findLocationById: findLocationById,
            updateLocation: updateLocation,
            deleteLocation: deleteLocation
            /*login: login,
            logout: logout,
            register: register,
            isLoggedIn: isLoggedIn,
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            updateUser: updateUser,
            createUser: createUser,
            deleteUser: deleteUser*/
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



        function login(user) {
            return $http.post("/api/login", user);
        }

        function logout() {
            return $http.post("/api/logout");
        }

        function register(user) {
            return $http.post("/api/register", user);
        }

        function isLoggedIn() {
            return $http.get("/api/isLoggedIn");
        }

        function findUserByCredentials(username, password) {
            var attr1 = "username="+username;
            var attr2 = "password="+password;
            var url="/api/user?"+attr1+"&"+attr2;
            return $http.get(url);
            /*for (var i in users) {
             if (users[i].username === username && users[i].password === password) {
             return users[i];
             }
             }

             return null;*/
        }

        function findUserById(userId) {
            var url = "/api/user/"+userId;
            return $http.get(url);
        }

        function findUserByUsername(username) {
            var attr1 = "username="+username;
            var url="/api/user?"+attr1;
            return $http.get(url);
        }

        function updateUser(userId, user) {
            var url ="/api/user/"+userId;
            return $http.put(url, user);
        }

        function createUser(user) {
            var newUser = {};
            //newUser._id = (new Date()).getTime() + "";
            newUser.username = user.username;
            newUser.password = user.password;
            var url = "/api/user";
            return $http.post(url, newUser);
        }

        function deleteUser(userId) {
            var url ="/api/user/"+userId;
            return $http.delete(url);

        }


    }

})();