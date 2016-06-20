module.exports = function () {

    var mongoose = require("mongoose");
    var Schema = mongoose.Schema;

    var FriendSchema = Schema({
        _id: {type: Schema.ObjectId, ref: 'UserProj'},
        username: String
    });

    var LocationSchema = Schema({
        _id: {type: Schema.ObjectId},
        name: String
    });


    var UserSchema = Schema({
        username: {type: String, required: true},
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        friends: [FriendSchema],
        locations: [LocationSchema],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "user"});

    return UserSchema;
}