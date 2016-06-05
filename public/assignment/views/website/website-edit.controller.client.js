(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController($location, $routeParams, WebsiteService) {
        console.log("In edit");
        var cModel = this;
        cModel.userId = $routeParams.uid;
        cModel.websiteId = $routeParams.wid;
        cModel.updateWebsite = updateWebsite;
        cModel.deleteWebsite = deleteWebsite;
        init();

        function init() {
                WebsiteService
                    .findWebsiteById(cModel.websiteId)
                    .then(function(response) {
                        cModel.website = response.data;
                        console.log(cModel.website);
                    })
        }

        function updateWebsite(website) {
            cModel.updateStats =

                WebsiteService
                    .updateWebsite(cModel.websiteId, website)
                    .then(function(response) {
                        var updateStats = response.status;
                        if (updateStats === 200) {
                            $location.url("/user/" + cModel.userId + "/website");
                        }
                        else {
                            cModel.error = "Unable to update website";
                        }

                    })
                    .catch(function(response) {
                        cModel.error = "Unable to update website";
                    });



        }

        function deleteWebsite(websiteId) {
            WebsiteService.deleteWebsite(websiteId)
                .then(function (response) {
                    var deleteStats = response.status;
                    if (deleteStats === 200) {
                        $location.url("/user/" + cModel.userId + "/website");
                    }
                    else {
                        cModel.error = "Unable to delete website";
                    }

                })
                .catch(function (response) {
                    cModel.error = "Unable to delete website";
                });
        }
    }
})();