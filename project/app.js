module.exports = function (app) {

    var models = require("./models/models.server")();
    require("./services/user.service.server.js")(app, models);
    require("./services/location.service.server")(app, models);
    require("./services/locationpost.service.server")(app, models);

};