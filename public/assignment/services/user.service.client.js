(function () {
    angular
        .module('TexApp')
        .factory("UserService", UserService);

    function UserService($http) {
        api = {
            login: login,
            logout: logout,
            register: register,
            isLoggedIn: isLoggedIn,
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            updateUser: updateUser,
            createUser: createUser,
            deleteUser: deleteUser,
        }
        return api;

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
            var attr1 = "username=" + username;
            var attr2 = "password=" + password;
            var url = "/api/user?" + attr1 + "&" + attr2;
            return $http.get(url);
            /*for (var i in users) {
             if (users[i].username === username && users[i].password === password) {
             return users[i];
             }
             }

             return null;*/
        }

        function findUserById(userId) {
            var url = "/api/user/" + userId;
            return $http.get(url);
        }

        function findUserByUsername(username) {
            var attr1 = "username=" + username;
            var url = "/api/user?" + attr1;
            return $http.get(url);
        }

        function updateUser(userId, user) {
            var url = "/api/user/" + userId;
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
            var url = "/api/user/" + userId;
            return $http.delete(url);
        }

    }
})();