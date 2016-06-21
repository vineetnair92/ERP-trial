module.exports = function (db_assignment) {

    var mongoose = require("mongoose");
    var LocationSchema = require("./location.schema.server")();
    var Location = db_assignment.model("Location", LocationSchema);
    var api = {
        createLocation: createLocation,
        findLocationByLatLng: findLocationByLatLng,
        findLocationById: findLocationById,
        updateLocation: updateLocation,
        deleteLocation: deleteLocation,
        removeUserFromLocation: removeUserFromLocation,

        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite,
        deletePageForWebsite: deletePageForWebsite
    };
    return api;

    function createLocation(location) {
        console.log("Create location in model");
        return Location.create(location);
    }

    function findLocationByLatLng(newLocLat, newLocLng) {
        console.log("Create location in model");
        return Location.findOne({"$and" : [{lat: newLocLat},{lng: newLocLng}]});
    }

    function findLocationById(locId) {
        console.log("Create location in model");
        return Location.findById({_id: locId});
    }
    
    function updateLocation(locId, location) {
        return Location.update({_id: locId},
            {
                $set: {
                    name: location.name,
                    description: location.description,
                    users: location.users
                }
            });
    }
    
    function deleteLocation(locId) {
        return Location.remove({_id: locId});
    }

    function removeUserFromLocation(locId, userId) {
        return Location
            .update({_id: locId},
                {
                    $pullAll: {
                        "users": [userId]
                    }
                },
                {safe: true});
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