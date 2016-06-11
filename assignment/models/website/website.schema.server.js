module.exports = function () {

    var mongoose = require("mongoose");
    var Schema = mongoose.Schema;
    var WebsiteSchema = Schema({
        _user: {type: Schema.Types.ObjectId, ref: 'User'},
        name: String,
        description: String,
        pages: [Schema.Types.ObjectId],
        dateCreated: {type: Date, default: Date.now},
    }, {collection: "website"});

    return WebsiteSchema;
}