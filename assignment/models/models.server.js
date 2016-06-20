module.exports = function () {

    var mongoose = require("mongoose");

    var connectionString = 'mongodb://localhost/assignment';

    if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
        connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
            process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
            process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
            process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
            process.env.OPENSHIFT_APP_NAME;
    }

   var db_assignment =  mongoose.createConnection(connectionString);


    var models = {
        userModel: require("./user/user.model.server.js")(db_assignment),
        websiteModel: require("./website/website.model.server")(db_assignment),
        pageModel: require("./page/page.model.server")(db_assignment),
        widgetModel: require("./widget/widget.model.server")(db_assignment)
    }

    return models;
}