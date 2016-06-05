(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($location, $routeParams, WebsiteService) {
        var cModel = this;
        cModel.userId = $routeParams.uid;
        cModel.createWebsite = createWebsite;


        function createWebsite(website) {


                WebsiteService
                    .createWebsite(cModel.userId, website)
                    .then(function (response) {
                        var result = response.status;
                        if (result) {
                            $location.url("/user/" + cModel.userId + "/website");
                        } else {
                            cModel.error = "Unable to create website";
                        }
                    })

        }
    }
})();