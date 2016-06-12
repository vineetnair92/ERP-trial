module.exports = function () {

    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server")();
    var User = mongoose.model("User", UserSchema);
    var Schema = mongoose.Schema;
    var api = {
        createWebsite: createUser,
        updateUser: updateUser,
        findUserByCredentials: findUserByCredentials,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        deleteUser: deleteUser,
        deleteWebsiteForUser: deleteWebsiteForUser

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

       /* User.find({websites: {$in: ['575c4add48ca7ebc53c4eef6']}})
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error){
                console.log(error);

            });*/

      /* User.update({_id: userId},
            {$pullAll : {
                "websites": ["575c61802de178285e96663c"]
            }},
            { safe: true })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });*/

        return User.findOne({_id:userId});
    }

    function findUserByUsername(username) {
        return User.findOne({username: username});
    }

    function deleteUser(userId) {
        return User.remove({_id:userId});
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
}