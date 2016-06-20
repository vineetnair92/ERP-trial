module.exports = function (db_assignment) {

    var mongoose = require("mongoose");
    var LocationSchema = require("./location.schema.server")();
    var Location = db_assignment.model("Location", LocationSchema);
    var api = {
        createLocationForUser: createLocationForUser,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite,
        deletePageForWebsite: deletePageForWebsite
    };
    return api;

    function createLocationForUser(location) {
        console.log("Create location in model");
        return Location.create(location);
    }

    function findAllWebsitesForUser(userId) {
        return Website.find({_user: userId});
    }

    function findWebsiteById(websiteId) {

        return Website.findById({_id: websiteId});
    }

    function updateWebsite(websiteId, website) {

        return Website.update({_id: websiteId},
            {
                $set: {
                    _user: website._user,
                    name: website.name,
                    description: website.description,
                    pages: website.pages
                }
            });
    }


    function deleteWebsite(websiteId) {
        return Website.remove({_id: websiteId});
    }

    function deletePageForWebsite(websiteId, pageId) {
        return Website.update({_id: websiteId},
            {
                $pullAll: {
                    "pages": [pageId]
                }
            },
            {safe: true});
    }
}