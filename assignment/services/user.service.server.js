module.exports = function (app, models) {

    var userModel = models.userModel;
    var users = [
        {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
        {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
        {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
    ];


    //app.get("/api/user", getUsers);

    app.post("/api/user", createUser);
    app.get("/api/user/:userId", findUserById);
    app.get("/api/user", findUser);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);


    function createUser(req, res) {
        var newUser = req.body;
        userModel
            .createWebsite(newUser)
            .then(function (user) {
                res.json(user);
            })
            .catch(function (error) {
                res.status(400).send();
            });
    }

    function findUserById(req, res) {
        var uid = req.params.userId;
        userModel
            .findUserById(uid)
            .then(function(user) {
                res.send(user);
            })
            .catch(function (error) {
                res.statusCode(404).send(err);
            })
    }

    function findUser(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if (username && password) {
            findUserByCredentials(username, password, res);
        } else if (username) {
            findUserByUsername(username, res);
        } else {
            res.send(users);
        }
    }

    function findUserByCredentials(username, password, res) {
        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                res.send(user);
            })
            .catch((function (error) {
                res.status(404).send(error);
            }))

    }

    function findUserByUsername(username, res) {
           userModel
               .findUserByUsername(username)
               .then(function(user){
                    res.send(user);
               })
               .catch(function(error){
                    res.status(400).send(error)
               });
    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var user = req.body;
        delete user._id;
        userModel
            .updateUser(user, userId)
            .then(function (response) {
                res.send(response);
            })
            .catch(function (error) {
                res.status(400).send(error);
            })

    }

    function deleteUser(req, res) {
        var userId = req.params.userId;
        userModel
            .deleteUser(userId)
            .then(function(response){
                res.send(response);
            }) 
            .catch(function (error) {
                 res.status(400).send(error);
            });
    }
};