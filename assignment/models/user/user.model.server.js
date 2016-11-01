module.exports = function (db_assignment) {

    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server")();
    var User = db_assignment.model("User", UserSchema);
    var Schema = mongoose.Schema;
    var api = {
        createUser: createUser,
        updateUser: updateUser,
        findUserByCredentials: findUserByCredentials,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        deleteUser: deleteUser,
        deleteWebsiteForUser: deleteWebsiteForUser,
        findUserByFacebookId: findUserByFacebookId

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
                    websites: user.websites
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


    function deleteWebsiteForUser(userId, websiteId) {
        return User.update({_id: userId},
            {
                $pullAll: {
                    "websites": [websiteId]
                }
            },
            {safe: true});
    }
    
    function findUserByFacebookId(facebookId) {
        return User.findOne({'facebook.id': facebookId});
    }
}