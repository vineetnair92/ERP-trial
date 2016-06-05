(function () {
    angular
        .module('WebAppMaker')
        .factory("UserService", UserService);

    var users = [
        {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
        {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
        {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
    ]

    function UserService($http) {
        api = {
            findUserByCredentials: findUserByCredentials,
            findByUserId: findByUserId,
            findUserByUsername: findUserByUsername,
            updateUser: updateUser,
            createUser: createUser,
            deleteuser: deleteUser
        }
        return api;

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

        function findByUserId(userId) {
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
            newUser._id = (new Date()).getTime() + "";
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