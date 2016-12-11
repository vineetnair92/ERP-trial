module.exports = function () {

    var mongoose = require("mongoose");
    var Schema = mongoose.Schema;
    var companyListSchema = Schema({
        _web: {type: Schema.Types.ObjectId, ref: 'Website'},
        company: String,
        dateCreated: {type: Date, default: Date.now},
    }, {collection: "companyList"});

    return companyListSchema;
};