module.exports = function () {

    var mongoose = require("mongoose");
    mongoose.connect('mongodb://localhost/assignment');
    var models = {
        userModel: require("./user/user.model.server.js")(),
        websiteModel: require("./website/website.model.server")()
    }
    return models;
}