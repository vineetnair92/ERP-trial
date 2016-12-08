(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    var userWebsitesUpdateError = "Error updating website references in user";

    function NewWebsiteController($location, $routeParams, WebsiteService, UserService, CompanyListService) {
        var cModel = this;
        cModel.userId = $routeParams.uid;
        cModel.createWebsite = createWebsite;


        function createWebsite(website) {
            WebsiteService
                .createWebsite(cModel.userId, website)
                .then(function (response) {
                    if (response.data) {
                        var _websiteId = response.data._id;
                        updateWebsiteReferencesInUser(_websiteId);
                    } else {
                        cModel.error = "Unable to create website";
                    }
                });
            CompanyListService
                .createCompanyList(cModel.userId, website)
                .then(function (response) {
                    if (!response.data) {
                        cModel.error = "Unable to create website";
                    }
                });

        }

        function updateWebsiteReferencesInUser(websiteId) {
            UserService
                .findUserById(cModel.userId)
                .then(function (response) {
                    var user = response.data;
                    if (user) {
                        user.websites.push(websiteId);
                        UserService
                            .updateUser(cModel.userId, user)
                            .then(function (response) {
                                if (response.status === 200) {
                                    $location.url("/user/" + cModel.userId + "/website");
                                }
                                else {
                                    cModel.error = userWebsitesUpdateError;
                                }
                            })
                            .catch(function (error) {
                                cModel.error = userWebsitesUpdateError;
                            });

                    }
                    else {
                        cModel.error = userWebsitesUpdateError;
                    }
                })
                .catch(function (error) {
                    cModel.error = userWebsitesUpdateError;
                });
        }
    }
})();