module.exports = function (app, models) {

    /*    var pages = [
     {"_id": "321", "name": "Post 1", "websiteId": "456"},
     {"_id": "432", "name": "Post 2", "websiteId": "456"},
     {"_id": "543", "name": "Post 3", "websiteId": "456"}
     ];*/

    var pageModel = models.pageModel;
    var websiteModel = models.websiteModel;
    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    function createPage(req, res) {
        var newPage = req.body;
        pageModel
            .createPage(newPage)
            .then(function (page) {
                res.json(page);
            })
            .catch(function (error) {
                res.status(400).send(error);
            });
    }

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;
        pageModel
            .findAllPagesForWebsite(websiteId)
            .then(function (pages) {
                res.json(pages);
            })
            .catch(function (error) {
                res.status(400).send(error);
            });

    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;
        pageModel
            .findPageById(pageId)
            .then(function (page) {
                res.json(page);
            })
            .catch(function (error) {
                res.status(400).send(error);
            });
    }

    function updatePage(req, res) {
        var page = req.body;
        var pageId = req.params.pageId;
        delete page._id;
        pageModel
            .updatePage(pageId, page)
            .then(function (response) {
                res.send(response);
            })
            .catch(function (error) {
                res.status(400).send(error);
            })

    }

    function deletePage(req, res) {
        var pageId = req.params.pageId;
        pageModel
            .findPageById(pageId)
            .then(function (page) {
                pageModel
                    .deletePage(pageId)
                    .then(function (response) {
                        websiteModel
                            .deletePageForWebsite(page._website, pageId)
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