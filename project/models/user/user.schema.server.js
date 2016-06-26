module.exports = function () {

    var mongoose = require("mongoose");
    var Schema = mongoose.Schema;

    var FriendSchema = Schema({
        _id: {type: Schema.ObjectId, ref: 'UserProj'},
        username: String
    });

    var LocationSchema = Schema({
        _id: {type: Schema.ObjectId, ref:'Location'},
        name: String
    });


    var UserSchema = Schema({
        username: {type: String, required: true},
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        role: {type: String, default: 'normal'},
        google: {
            id:    String,
            token: String
        },
        friends: [FriendSchema],
        locations: [LocationSchema],
        endorsedPost: [{type:Schema.ObjectId, ref: 'LocationPost'}],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "user_tp"});

    return UserSchema;
}