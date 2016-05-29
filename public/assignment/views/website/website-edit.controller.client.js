(function(){
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController($location, $routeParams, WebsiteService) {
        var cModel = this;
        cModel.userId = $routeParams.uid;
        cModel.websiteId = $routeParams.wid;
        cModel.updateWebsite = updateWebsite;
        cModel.deleteWebsite = deleteWebsite;
        init();

        function init() {
            cModel.website = WebsiteService.findWebsiteById(cModel.websiteId);
        }
        
        function updateWebsite(website) {
            cModel.updateStats = WebsiteService.updateWebsite(cModel.websiteId, website);
        }

        function deleteWebsite(websiteId) {
            var result = WebsiteService.deleteWebsite(websiteId);
            if(result) {
                $location.url("/user/"+cModel.userId+"/website");
            } else {
                cModel.error = "Unable to delete website";
            }
        }
    }
})();