module.exports = function (app) {

    var models = require("./models/models.server")();
    require("./services/user.service.server.js")(app, models);
    require("./services/website.service.server.js")(app, models);
    require("./services/page.service.server.js")(app, models);
    require("./services/order.service.server.js")(app, models);
    require("./services/companylist.service.server.js")(app, models);
};