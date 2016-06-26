module.exports = function (app, models) {

    var locationModel = models.locationModel;
    var userModel = models.userModel;

    app.post("/api/userP/:userId/location", createLocation);
    app.get("/api/location/:locId", findLocationById);
    app.get("/api/location", findAllLocations);
    app.put("/api/location/:locId", updateLocation);
    app.delete("/api/userP/:userId/location/:locId", deleteLocation);
//    app.delete("/api/admin/location/:locId", deleteLocationByAdmin);

    /* app.get("/api/user/:userId/website", findAllWebsitesForUser);
     app.get("/api/website/:websiteId", findWebsiteById);
     app.put("/api/website/:websiteId", updateWebsite);
     app.delete("/api/website/:websiteId", deleteWebsite);
     */
    function createLocation(req, res) {
        var newLocation = req.body;
        var newLocLat = newLocation.lat;
        var newLocLng = newLocation.lng;
        var userId = req.params.userId;
        var locId, locName;
        locationModel
            .findLocationByLatLng(newLocLat, newLocLng)
            .then(
                function (location) {
                    if (!location) {
                        newLocation.users = [userId];
                        return locationModel
                            .createLocation(newLocation);
                    }
                    else {
                        locId = location._id;
                        locName = location.name;
                        delete location._id;
                        var duplicateUser = false;

                        location.users.forEach(function (user) {
                            if (user == userId) {
                                duplicateUser = true;
                            }
                        });

                        if (!duplicateUser) {
                            location.users.push(userId);
                            console.log(location.users);
                            return locationModel
                                .updateLocation(locId, location);
                        }
                        else {
                            return null;
                        }
                    }
                },
                function (err) {
                    return err;
                }
            )
            .then(
                function (response) {
                    if (response) {
                        if (response._id) {
                            locId = response._id;
                            locName = response.name;
                        }
                        var locRef = {_id: locId, name: locName};
                        res.send(locRef);
                    }
                    else {
                        res.status(400).send();
                    }

                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findLocationById(req, res) {
        var locId = req.params.locId;
        locationModel
            .findLocationById(locId)
            .then(function (location) {
                res.json(location);
            })
            .catch(function (error) {
                res.status(400).send(error);
            });
    }

    function findAllLocations(req, res) {
        locationModel
            .findAllLocations()
            .then(function (locations) {
                res.json(locations)
            }, function (err) {
                res.status(400).send(err);
            })

    }

    function updateLocation(req, res) {
        var location = req.body;
        var locId = req.params.locId;
        delete location._id;
        locationModel
            .updateLocation(locId, location)
            .then(function (response) {
                res.send(response);
            })
            .catch(function (error) {
                res.status(400).send(error);
            })
    }

    function deleteLocation(req, res) {
        var locId = req.params.locId;
        var userId = req.params.userId;
        locationModel
            .removeUserFromLocation(locId, userId)
            .then(function (response) {
                    return locationModel
                        .findLocationById(locId)
                },
                function (err) {
                    return err;
                })
            .then(function (location) {
                    if (location.users.length == 0) {
                        return locationModel
                            .deleteLocation(locId);
                    }
                    else {
                        return location;
                    }
                },
                function (err) {
                    return err;
                })
            .then(function (response) {
                    return userModel
                        .removeLocationFromUser(userId, locId);
                },
                function (err) {
                    return err;
                })
            .then(function (response) {
                    res.status(200).send();
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

/*    function deleteLocationByAdmin(req, res) {
        var locId = req.params.locId;
        var usersWithLocation = [];
        locationModel
            .findLocationById(locId)
            .then(function (location) {
                if (location) {
                    usersWithLocation = location.users;
                    return locationModel
                        .deleteLocation(locId);
                }
                else {
                    return null;
                }

            }, function (err) {
                return err;
            })
            .then(function (response) {
                var deletedLocationForUsers = 0;
                if (response) {
                    for (var i = 0; i < usersWithLocation.length; i++) {
                        userModel
                            .removeLocationFromUser(userId, locId)
                            .then(function (response) {
                                 if(response) {
                                     deletedLocationForUsers++;
                                 }
                            },
                            function (err) {
                                  console.log(err);
                            })
                    }

                }


            });
    }*/

    /*
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
     }*/
};