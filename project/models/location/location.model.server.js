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
        findAllLocations: findAllLocations,
        removeUserFromLocations: removeUserFromLocations,
        deleteLocationsWithNoUsers: deleteLocationsWithNoUsers
    };
    return api;

    function createLocation(location) {
        console.log("Create location in model");
        return Location.create(location);
    }

    function findLocationByLatLng(newLocLat, newLocLng) {
        console.log("Create location in model");
        return Location.findOne({"$and": [{lat: newLocLat}, {lng: newLocLng}]});
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

    function removeUserFromLocations(userId, userLocations) {
        return Location
            .update({_id: {$in: userLocations}},
                {
                    $pullAll: {users: [userId]}
                },
                {multi: true});
    }

    function deleteLocationsWithNoUsers() {
        return Location.remove({users: []});
    }

    function findAllLocations() {
        return Location.find();

    }

}