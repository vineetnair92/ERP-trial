module.exports = function (app, models) {

    var websiteModel = models.websiteModel;
    var userModel = models.userModel;

    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    function createWebsite(req, res) {
        var newWebsite = req.body;
        websiteModel
            .createWebsiteForUser(newWebsite)
            .then(function (website) {
                res.json(website);
                console.log(website._doc._id);
            })
            .catch(function (error) {
                res.status(400).send(error);
            })
    }

    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;
        websiteModel
            .findAllWebsitesForUser(userId)
            .then(function (websites) {
                res.json(websites);
            })
            .catch(function (error) {
                res.status(400).send(error);
            });
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;
        websiteModel
            .findWebsiteById(websiteId)
            .then(function (website) {
                res.json(website);
            })
            .catch(function (error) {
                res.status(400).send(error);
            });

    }

    function updateWebsite(req, res) {
        var website = req.body;
        var websiteId = req.params.websiteId;
        delete website._id;
        websiteModel
            .updateWebsite(websiteId, website)
            .then(function (response) {
                res.send(response);
            })
            .catch(function (error) {
                res.status(400).send(error);
            })
    }

    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;
        websiteModel
            .findWebsiteById(websiteId)
            .then(function (website) {
                websiteModel
                    .deleteWebsite(websiteId)
                    .then(function (response) {
                        userModel
                            .deleteWebsiteForUser(website._user, websiteId)
                            .then(function (response) {
                                res.send(response);
                            })
                            .catch(function (error) {
                                res.status(400).send(error);
                            })

                    })
                    .catch(function (error) {
                        res.status(400).send(error);
                    });
            })
            .catch(function (error) {
                res.status(400).send(error);
            });
    }
};