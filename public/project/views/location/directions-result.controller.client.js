(function () {
    angular
        .module("TrafficPost")
        .controller("DirectionsResultController", DirectionsResultController);

    var directionsResultError = "Error fetching directions result!";

    function DirectionsResultController($location, $routeParams, $scope, LocationService, UserService, LocationPostService) {
        var cModel = this;
        cModel.userId = $routeParams.uid;
        cModel.selfLocPosts = [];
        cModel.friendsLocPosts = [];
        cModel.othersLocPosts = [];
        cModel.endorsePost = endorsePost;
        cModel.unendorsePost = unendorsePost;
        cModel.isEndorsedByCurrentUser = isEndorsedByCurrentUser;
        var currentUser;
        findCurrentUser();
        function init() {
            var encodedPolyline, friends;
            encodedPolyline = $location.search().polyline;
            var polycleaned = $location.search().polyline.replace(/\\/g, "\\\\");
            var booltest = IsLocationInPolyline(42.33990,-71.09037, encodedPolyline);
            console.log("CAME HERE");
            console.log($location.search());
            var queryParams = $location.search();
            if (queryParams.polyline && queryParams.startLatLng && queryParams.endLatLng) {
                encodedPolyline = queryParams.polyline;
                console.log("setting startLocation and endLocation for state");

                cModel.startLocation = {name: queryParams.startName, latlng: queryParams.startLatLng}
                cModel.endLocation = {name: queryParams.endName, latlng: queryParams.endLatLng}
                //  cModel.startLocation.name = queryParams.qParamsStartName;
                // cModel.endLocation.name = queryParams.qParamsEndName;
            }

            UserService
                .findUserById(cModel.userId)
                .then(function (response) {
                    friends = response.data.friends;
                    return LocationService
                        .findAllLocations();
                }, function (err) {
                    return err;
                })
                .then(function (response) {
                    // TO DO for each location,check if the location falls in polyline
                    // if yes, collect the locIds in array
                    var locations = response.data;
                    var locIds = [];

                    locations.forEach(function (location) {
                        if (IsLocationInPolyline(location.lat, location.lng, encodedPolyline)) {
                            locIds.push(location._id);
                        }
                    });
                    return LocationPostService
                        .findAllLocationPostForLocations(locIds);
                }, function (err) {
                    return err;
                })
                .then(function (response) {
                    var locationPosts = response.data;
                    if (locationPosts.length) {
                        if (friends.length) {
                            locationPosts
                                .forEach(function (locationPost) {
                                    friends.forEach(function (friend) {
                                        if (locationPost._user._id == friend._id) {
                                            cModel.friendsLocPosts.push(locationPost);
                                        }
                                        else if (locationPost._user._id == cModel.userId) {
                                            cModel.selfLocPosts.push(locationPost);
                                        }
                                        else {
                                            cModel.othersLocPosts.push(locationPost);
                                        }
                                    })
                                });
                        }
                        else {
                            locationPosts
                                .forEach(function (locationPost) {
                                    if (locationPost._user._id == cModel.userId) {
                                        cModel.selfLocPosts.push(locationPost);
                                    }
                                    else {
                                        cModel.othersLocPosts.push(locationPost);
                                    }
                                });
                        }
                    }
                    else {
                        cModel.error = "No Location Posts Found ";
                    }
                }, function (err) {
                    cModel.error = "Something went wrong !";
                });


        }

        init();

        function endorsePost(locPostId, postGroup) {
            LocationPostService
                .endorsePost(locPostId, cModel.userId)
                .then(function (response) {
                      if(response.data) {
                          var updatedLocPost = response.data;
                          findCurrentUser();
                          updatePostsArray(postGroup, updatedLocPost);
                      }
                }, function (err) {
                    cModel.error = "Error Endorsing Post!";
                });
        }


        function unendorsePost(locPostId, postGroup) {
            LocationPostService
                .unendorsePost(locPostId, cModel.userId)
                .then(function (response) {
                    if(response.data) {
                        var updatedLocPost = response.data;
                        findCurrentUser();
                        updatePostsArray(postGroup, updatedLocPost);
                    }
                }, function (err) {
                    cModel.error = "Error UnEndorsing Post!";
                });
        }
        
        function findCurrentUser() {
            UserService
                .findUserById(cModel.userId)
                .then(function (response) {
                    if(response.data) {
                        currentUser = response.data;
                    }
                    else {
                        currentUser = null;
                        cModel.error = "Error fetching user details!!";
                    }
                }, function (err) {
                    cModel.error = "Error fetching user details!!";
                });
        }

        function updatePostsArray(postGroup, updatedLocPost) {
            var i, locPost;
            if(postGroup == 'friends') {
                for(i=0;i<cModel.friendsLocPosts.length; i++) {
                    locPost = cModel.friendsLocPosts[i];
                    if(locPost._id == updatedLocPost._id) {
                        cModel.friendsLocPosts.splice(i,1);
                        cModel.friendsLocPosts.push(updatedLocPost);
                        break;
                    }
                }
            }
            else if(postGroup == 'others') {
                for(i=0;i<cModel.othersLocPosts.length; i++) {
                    locPost = cModel.othersLocPosts[i];
                    if(locPost._id == updatedLocPost._id) {
                        cModel.othersLocPosts.splice(i,1);
                        cModel.othersLocPosts.push(updatedLocPost);
                        break;
                    }
                }
            }
        }

        function isEndorsedByCurrentUser(locPostId) {
            var isEndorsed =false;
            currentUser
                .endorsedPost
                .forEach(function (endorsedPostId) {
                    if(endorsedPostId == locPostId) {
                          isEndorsed = true;
                    }
                });
            return isEndorsed;
        }


        function searchRoutes(startLocation, endLocation) {


            var qParamsStartLatLng = "startLatLng=" + startLocation.latlng;
            var qParamsEndLatLng = "endLatLng=" + endLocation.latlng;
            var qParamsStartName = "startName=" + startLocation.name;
            var qParamsEndName = "endName=" + endLocation.name;

            $location.url("/user/" + cModel.userId + "/go?" + qParamsStartName + "&" + qParamsStartLatLng + "&" + qParamsEndName + "&" + qParamsEndLatLng);
            console.log(startLocation, endLocation);


        }

        function routesCallback(response, status) {
            var poly;
            if (status === google.maps.DirectionsStatus.OK) {
                //    directionsDisplay.set(response);
                /*     console.log(response.routes[0].overview_polyline);
                 poly = response.routes[0].overview_polyline;
                 polycleaned = response.routes[0].overview_polyline.replace(/\\/g, "\\\\");
                 console.log("\n");
                 console.log(poly);
                 cModel.response = poly;
                 IsLocationInPolyline(42.34169, -71.09065, poly); // in
                 IsLocationInPolyline(42.34656, -71.09015, poly); // out
                 IsLocationInPolyline(42.34499, -71.09069, poly); // in
                 IsLocationInPolyline(42.34388, -71.08994, poly); // in
                 IsLocationInPolyline(42.34393, -71.08973, poly); // out
                 IsLocationInPolyline(42.34656, -71.09015, poly); // out
                 IsLocationInPolyline(42.34656, -71.09015, poly);
                 IsLocationInPolyline(42.34656, -71.09015, poly);
                 IsLocationInPolyline(42.34656, -71.09015, poly);
                 IsLocationInPolyline(42.34656, -71.09015, poly);
                 IsLocationInPolyline(42.34656, -71.09015, poly);
                 IsLocationInPolyline(42.34656, -71.09015, poly);
                 IsLocationInPolyline(42.34656, -71.09015, poly);
                 IsLocationInPolyline(42.34656, -71.09015, poly);*/
                cModel.routes = response.routes;
                $scope.$apply();
            } else {
                poly = null;
                window.alert('Directions request failed due to ' + status);

            }
        }

        function getSafeHtml(step) {
            return $sce.trustAsHtml(step.instructions);
        }

    }
})();