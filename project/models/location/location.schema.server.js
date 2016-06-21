module.exports = function () {

    var mongoose = require("mongoose");
    var Schema = mongoose.Schema;


    var LocationSchema = Schema({
        name: {type: String, required: true},
        description: String,
        lat: String,
        lng: String,
        city: String,
        state: String,
        country: String,
        users: [{type: Schema.ObjectId, ref: 'UserProj'}],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "location"});

    return LocationSchema;
}