module.exports = function () {


    var mongoose = require("mongoose");

//    var connectionString = 'mongodb://localhost/erp';
    var connectionString = 'mongodb://heroku_dkjw1m77:2ued38bogvfa0sl5873ahsmc5v@ds037165.mlab.com:37165/heroku_dkjw1m77';


    if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
        connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
            process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
            process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
            process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
            process.env.OPENSHIFT_APP_NAME;
    }

    mongoose.Promise = global.Promise;

   var db_assignment =  mongoose.createConnection(connectionString);


    var models = {
        userModel: require("./user/user.model.server.js")(db_assignment),
        websiteModel: require("./website/website.model.server")(db_assignment),
        pageModel: require("./page/page.model.server")(db_assignment),
        orderModel: require("./order/order.model.server")(db_assignment),
    }

    return models;
}