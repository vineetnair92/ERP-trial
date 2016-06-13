module.exports = function () {

    var mongoose = require("mongoose");
    var WebsiteSchema = require("./website.schema.server.js")();
    var Website = mongoose.model("Website", WebsiteSchema);
    var api = {
        createWebsiteForUser: createWebsiteForUser,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite,
        deletePageForWebsite: deletePageForWebsite
    };
    return api;

    function createWebsiteForUser(website) {
        console.log("Create website in model");
        return Website.create(website);
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