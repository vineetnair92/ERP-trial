module.exports = function (app, models) {

    var locationModel = models.locationModel;
    var userModel = models.userModel;
    var locationPostModel = models.locationPostModel;

    app.post("/api/userP/:userId/location/:locId/locationpost", createLocationPost);
    app.get("/api/userP/:userId/location/:locId/locationpost", findAllLocationPostForUserLocation);
    app.get("/api/userP/:userId/locationpost", findAllLocationPostForUser);
    app.post("/api/locationpost", findAllLocationPostForLocations);
    app.get("/api/locationpost/:locPostId", findLocationPostById);
    app.get("/api/locationpost", findAllLocationPosts);
    app.delete("/api/locationpost/:locPostId", deleteLocationPost);
    app.put("/api/userP/:userId/locationpost/:locPostId/endorse", endorsePost);
    app.delete("/api/userP/:userId/locationpost/:locPostId/unendorse", unendorsePost);
/*    app.get("/api/location/:locId", findLocationById);
    app.put("/api/location/:locId", updateLocation);
    app.delete("/api/userP/:userId/location/:locId", deleteLocation);*/

   /* app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);
*/
    function createLocationPost(req, res) {
        var newLocationPost = req.body;
        var userId = req.params.userId;
        var locId = req.params.locId;

        userModel
            .findUserById(userId)
            .then(function (user) {
                if(user) {
                    newLocationPost._user = {
                        _id: user._id,
                         firstName:  user.firstName
                    }

                    return locationModel
                        .findLocationById(locId)
                }
                else {
                    return null;
                }
            })
            .then(function (location) {
                if (location) {
                    newLocationPost._location = {
                        _id  : location._id,
                        name : location.name
                    }

                    locationPostModel
                        .createLocationPost(newLocationPost)
                        .then(function (locationPost) {
                                res.json(locationPost);
                            },
                            function (err) {
                                res.status(400).send();
                            })
                }
                else {
                    res.status(400).send();
                }
            },function (err) {
                res.status(400).send(err);
            });
    }

    function findAllLocationPostForUserLocation(req, res) {
        var userId = req.params.userId;
        var locId = req.params.locId;
        locationPostModel
            .findAllLocationPostForUserLocation(userId, locId)
            .then(function (locationposts) {
                res.json(locationposts)
            },function (err) {
                res.status(404).send();
            });

    }

    function findAllLocationPostForUser(req, res) {
        var userId = req.params.userId;
        locationPostModel
            .findAllLocationPostForUser(userId)
            .then(function (locationposts) {
                res.json(locationposts);
            }, function (err) {
                res.status(400).send();
            });
    }

    function findLocationPostById(req, res) {
        var locPostId =  req.params.locPostId;
        locationPostModel
            .findLocationPostById(locPostId)
            .then(function (locationPost) {
                res.json(locationPost);
            }, function (err) {
                res.status(400).send();
            })
    }


    function deleteLocationPost(req, res){
        var locPostId = req.params.locPostId;
        var endorsedUsers;
        locationPostModel
            .findLocationPostById(locPostId)
            .then(function (locationPost) {
                endorsedUsers = locationPost.endorsedBy;
                return userModel.
                    removeEndorseFromUsers(locPostId, endorsedUsers);
            }, function (err) {
                return err;
            })
            .then(function (response) {
                return locationPostModel
                    .deleteLocationPost(locPostId);
            }, function (err) {
                return err;
            })
            .then(function (response) {
                res.status(200).send();
            },function (err) {
                res.status(400).send();
            });
    }

    function findAllLocationPostForLocations(req, res) {
        var locationIds = req.body;
        locationPostModel
            .findAllLocationPostForLocations(locationIds)
            .then(function (locationPosts) {
                res.status(200).send(locationPosts);
            }, function (err) {
                res.status(400).send();
            });

    }

    function endorsePost(req, res) {
        var locPostId = req.params.locPostId;
        var userId = req.params.userId;
        locationPostModel
            .endorsePost(locPostId, userId)
            .then(function (response) {
                 return userModel.endorsesPost(userId, locPostId);
            }, function (err) {
                 return err;
            })
            .then(function (response) {
               return locationPostModel
                         .findLocationPostById(locPostId);
            }, function (err) {
                 return err;
            })
            .then(function (locationPost) {
                res.json(locationPost)
            },function (err) {
                res.status(400).send();
            })


    }
    function unendorsePost(req, res) {
        var locPostId = req.params.locPostId;
        var userId = req.params.userId;
        locationPostModel
            .unendorsePost(locPostId, userId)
            .then(function (response) {
                return userModel.unendorsesPost(userId, locPostId);
            }, function (err) {
                return err;
            })
            .then(function (response) {
                return locationPostModel
                    .findLocationPostById(locPostId);
            }, function (err) {
                return err;
            })
            .then(function (locationPost) {
                res.json(locationPost)
            },function (err) {
                res.status(400).send();
            })
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

    function findAllLocationPosts(req, res) {
        locationPostModel
            .findAllLocationPosts()
            .then(function (locations) {
                res.json(locations);
            }, function (err) {
                res.status(400).send();
            })
    }

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