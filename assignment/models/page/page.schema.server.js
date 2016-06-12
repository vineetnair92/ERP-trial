module.exports = function () {

    var mongoose = require("mongoose");
    var Schema = mongoose.Schema;
    var PageSchema = Schema({
        _website: {type: Schema.Types.ObjectId, ref: 'User'},
        name: String,
        title: String,
        description: String,
        widgets: [Schema.Types.ObjectId],
        dateCreated: {type: Date, default: Date.now},
    }, {collection: "page"});

    return PageSchema;
}