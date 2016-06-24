module.exports = function () {

    var mongoose = require("mongoose");
    var Schema = mongoose.Schema;


    var UserSchema = Schema({
        _id: {type: Schema.ObjectId, ref: 'UserProj'},
        firstName: String
    });

    var LocationSchema = Schema({
        _id: {type: Schema.ObjectId, ref:'Location'},
        name: String
    });



    var LocationPostSchema = Schema({
        _user : UserSchema,
        _location: LocationSchema,
        description: String,
        trafficType: String,
        severity: String,
        endorsedBy: [{type: Schema.ObjectId, ref: 'UserProj'}],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "locationpost"});

    return LocationPostSchema;
}