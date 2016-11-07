(function () {
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController);

    var websitePagesUpdateError = "Error updating pages references in websites";

    function NewPageController($location, $routeParams, PageService, WebsiteService) {
        var cModel = this;
        cModel.userId = $routeParams.uid;
        cModel.websiteId = $routeParams.wid;
        cModel.createPage = createPage;

        function createPage(page) {
            PageService
                .createPage(cModel.websiteId, page)
                .then(function (response) {
                    var page = response.data;
                    if (page) {
                        var _pageId = page._id;
                        updatePageReferencesInWebsite(_pageId);
                    } else {
                        cModel.error = "Unable to create page";
                    }
                })
                .catch(function (error) {
                    cModel.error = "Something went wrong!!"
                })
        }


        function updatePageReferencesInWebsite(pageId) {
            WebsiteService
                .findWebsiteById(cModel.websiteId)
                .then(function (response) {
                    var website = response.data;
                    if (website) {
                        website.pages.push(pageId);
                        WebsiteService
                            .updateWebsite(cModel.websiteId, website)
                            .then(function (response) {
                                if (response.status === 200) {
                                    $location.url("/user/" + cModel.userId + "/website/" + cModel.websiteId + "/page");
                                }
                                else {
                                    cModel.error = websitePagesUpdateError;
                                }
                            })
                            .catch(function (error) {
                                cModel.error = websitePagesUpdateError;
                            });

                    }
                    else {
                        cModel.error = websitePagesUpdateError;
                    }
                })
                .catch(function (error) {
                    cModel.error = websitePagesUpdateError;
                });
        }

    }
})();