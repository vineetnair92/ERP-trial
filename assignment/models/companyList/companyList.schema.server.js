module.exports = function () {

    var mongoose = require("mongoose");
    var Schema = mongoose.Schema;
    var companyListSchema = Schema({
        _user: {type: Schema.Types.ObjectId, ref: 'User'},
        company: String,
        dateCreated: {type: Date, default: Date.now},
    }, {collection: "companyList"});

    return companyListSchema;
};