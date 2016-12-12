module.exports = function () {


    var mongoose = require("mongoose");

    var connectionString = 'mongodb://localhost/erp';
    //var connectionString = 'mongodb://heroku_dkjw1m77:2ued38bogvfa0sl5873ahsmc5v@ds037165.mlab.com:37165/heroku_dkjw1m77';


    if (process.env.WEB_CONCURRENCY) {
        connectionString = process.env.MONGODB_URI;
    }

    mongoose.Promise = global.Promise;

   var db_assignment =  mongoose.createConnection(connectionString);


    var models = {
        userModel: require("./user/user.model.server.js")(db_assignment),
        websiteModel: require("./website/website.model.server")(db_assignment),
        pageModel: require("./page/page.model.server")(db_assignment),
        orderModel: require("./order/order.model.server")(db_assignment),
        companyListModel: require("./companyList/companyList.models.server")(db_assignment)
    }

    return models;
}