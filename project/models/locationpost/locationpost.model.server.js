module.exports = function (db_assignment) {

    var mongoose = require("mongoose");
    var LocationPostSchema = require("./locationpost.schema.server")();
    var LocationPost = db_assignment.model("LocationPost", LocationPostSchema);
    var api = {
        createLocationPost: createLocationPost,
        findAllLocationPostForUserLocation: findAllLocationPostForUserLocation,
        findAllLocationPostForLocations: findAllLocationPostForLocations,
        findAllLocationPostForUser: findAllLocationPostForUser,
        findLocationPostById: findLocationPostById,
        deleteLocationPost: deleteLocationPost,
        endorsePost: endorsePost,
        unendorsePost: unendorsePost
    };
    return api;

    function createLocationPost(location) {
        console.log("Create location post in model");
        return LocationPost.create(location);
    }

    function findAllLocationPostForUserLocation(userId, locId) {
        return LocationPost.find({"$and" : [{ '_user._id' : userId},{'_location._id': locId}]});
    }

    function findAllLocationPostForLocations(locationIds) {
        return LocationPost
            .find({'_location._id' : {$in : locationIds}});
    }

    function findAllLocationPostForUser(userId) {
        return LocationPost
            .find({'_user._id': userId});
    }

    function findLocationPostById(locPostId) {
        return LocationPost
            .findById({_id: locPostId});
    }

    function deleteLocationPost(locPostId) {
        return LocationPost.remove({_id: locPostId});
    }

    function endorsePost(locPostId, userId) {
        return LocationPost
            .update({_id: locPostId}, {$push : {endorsedBy: userId}});
    }

    function unendorsePost(locPostId, userId) {
        return LocationPost
            .update({_id: locPostId}, {$pull : {endorsedBy: userId}});
    }
}