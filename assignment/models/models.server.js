module.exports = function () {

    var mongoose = require("mongoose");
    mongoose.connect('mongodb://127.0.0.1:27017/assignment');
    var models = {
        userModel: require("./user/user.model.server.js")(),
        websiteModel: require("./website/website.model.server")()
    }
    return models;
}