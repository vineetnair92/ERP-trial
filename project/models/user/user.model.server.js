module.exports = function (db_project) {

    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server")();
    var User = db_project.model("UserProj", UserSchema);
    var Schema = mongoose.Schema;
    var api = {
        createUser: createUser,
        updateUser: updateUser,
        findUserByCredentials: findUserByCredentials,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        deleteUser: deleteUser,
        addLocationForUser: addLocationForUser,
        removeLocationFromUser: removeLocationFromUser,
        findAllUsers: findAllUsers,
        addUserForUser: addUserForUser,
        removeUserFromUser: removeUserFromUser,
        endorsesPost: endorsesPost,
        unendorsesPost: unendorsesPost

    };
    return api;

    function createUser(user) {
        console.log("Create user in model");
        console.log(user);
        return User.create(user);
    }

    function updateUser(user, userId) {

        return User.update({_id: userId},
            {
                $set: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone,
                    friends: user.friends,
                    locations: user.locations
                }
            });
    }

    function findUserByCredentials(username, password) {
        return User.findOne({username: username, password: password});
    }

    function findUserById(userId) {

        return User.findOne({_id: userId});
    }

    function findUserByUsername(username) {
        return User.findOne({username: username});
    }

    function deleteUser(userId) {
        return User.remove({_id: userId});
    }

    function addLocationForUser(userId, location, res) {
        User
            .findOne({_id: userId})
            .then(
                function (user) {
                    if (user) {
                        user.locations.push(location);
                        user.save();
                        res.status(200).send();
                    }
                    else {
                        res.status(404).send();
                    }
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function removeLocationFromUser(userId, locId) {
        return User
            .update({_id: userId},
                {
                    $pull: {
                        "locations": {_id: locId}
                    }
                },
                {safe: true});
    }

    function findAllUsers() {
        return User
            .find();
    }

    function addUserForUser(userId, user) {
        return User
            .update({_id: userId}, {$push: {friends: {_id: user._id, username: user.username}}});
    }

    function removeUserFromUser(userId, friendId) {
        return User
            .update({_id: userId}, {$pull: {friends: {_id: friendId}}});
    }

    function endorsesPost(userId, locPostId) {
        return User
            .update({_id: userId}, {$push: {endorsedPost: locPostId}});

    }

    function unendorsesPost(userId, locPostId) {
        return User
            .update({_id: userId}, {$pull: {endorsedPost: locPostId}});

    }


}