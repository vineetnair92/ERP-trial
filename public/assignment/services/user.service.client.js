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

    function UserService() {
         api = {
             findUserByCredentials : findUserByCredentials,
             findByUserId : findByUserId,
             updateUser: updateUser,
             createUser: createUser,
             deleteuser: deleteUser
         }
         return api;
        
        function findUserByCredentials(username, password) {
            for(var i in users) {
                if(users[i].username === username && users[i].password === password) {
                    return users[i];
                }
            }

            return null;
        }

        function findByUserId(userId) {
            for(var i in users) {
                if(users[i]._id === userId) {
                    return users[i];
                }
            }

            return null;
        }

        function findByUsername(userName) {
            for(var i in users) {
                if(users[i].username === userName) {
                    return users[i];
                }
            }

            return null;
        }

        function updateUser(userId, user) {
            for(var i in users) {
                if(users[i]._id === userId) {
                    users[i].firstName = user.firstName;
                    users[i].lastName = user.lastName;
                    users[i].email = user.email;
                    return true;
                }
            }
            return false;
        }

        function createUser(user) {
            var newUser = {};
            newUser._id = parseInt(users[users.length - 1]._id) + 1 +"";
            newUser.username = user.username;
            newUser.password = user.password;
            users.push(newUser);
            return true;
        }

        function deleteUser(userId) {
            for(var i in users) {
                if(users[i]._id === userId) {
                    users.splice(i,1);
                    return true;
                }
            }
            return false;
        }


    }

})();