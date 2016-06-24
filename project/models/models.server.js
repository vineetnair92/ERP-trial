module.exports = function () {

    var mongoose = require("mongoose");

    var connectionString = 'mongodb://localhost/project';

    if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
        connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
            process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
            process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
            process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
            process.env.OPENSHIFT_APP_NAME;
    }

    var db_project = mongoose.createConnection(connectionString);


    var models = {
        userModel: require("./user/user.model.server.js")(db_project),
        locationModel: require("./location/location.model.server")(db_project),
        locationPostModel: require("./locationpost/locationpost.model.server")(db_project)
    }
    return models;
}