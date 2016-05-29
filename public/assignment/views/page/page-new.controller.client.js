(function(){
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController);

    function NewPageController($location, $routeParams, PageService) {
        var cModel = this;
        cModel.userId = $routeParams.uid;
        cModel.websiteId = $routeParams.wid;
        cModel.createPage = createPage;


        function createPage(page) {
            var result = PageService.createPage(cModel.websiteId, page);
            if(result) {
                $location.url("/user/"+cModel.userId+"/website/"+cModel.websiteId+"/page");
            } else {
                cModel.error = "Unable to create website";
            }
        }
    }
})();