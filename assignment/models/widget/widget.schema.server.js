module.exports = function () {

    var mongoose = require("mongoose");
    var Schema = mongoose.Schema;
    var WidgetSchema = Schema({
        _page: {type: Schema.Types.ObjectId, ref: 'User'},
        type: String,
        name: String,
        text: String,
        placeholder: String,
        description: String,
        url: String,
        width: String,
        height: String,
        rows: {type: Number, default: 0},
        size: {type: Number, default: 0},
        class: String,
        icon: String,
        deletable: Boolean,
        formatted: Boolean,
        rank: {type: Number, default: 0},
        dateCreated: {type: Date, default: Date.now},
    }, {collection: "widget"});

    return WidgetSchema;
}