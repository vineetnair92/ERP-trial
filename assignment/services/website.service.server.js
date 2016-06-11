module.exports = function (app, models) {

    var websiteModel = models.websiteModel;
    var websites = [
        {"_id": "123", "name": "Facebook", "developerId": "456"},
        {"_id": "234", "name": "Tweeter", "developerId": "456"},
        {"_id": "456", "name": "Gizmodo", "developerId": "456"},
        {"_id": "567", "name": "Tic Tac Toe", "developerId": "123"},
        {"_id": "678", "name": "Checkers", "developerId": "123"},
        {"_id": "789", "name": "Chess", "developerId": "234"}
    ];

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
            })
            .catch(function (error) {
               res.status(400).send(error);
            });
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
        for (var i in websites) {
            if (websites[i]._id === websiteId) {
                websites[i].name = website.name;
                websites[i].description = website.description;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(400);
    }

    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;
        websiteModel
            .deleteWebsite(websiteId)
            .then(function (response) {
                res.send(response);
            })
            .catch(function (error) {
                res.status(400).send(error);
            });
    }
};