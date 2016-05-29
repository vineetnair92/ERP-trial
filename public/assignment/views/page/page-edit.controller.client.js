(function(){
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController);

    function EditPageController($location, $routeParams, PageService) {
        console.log("In edit page");
        var cModel = this;
        cModel.userId = $routeParams.uid;
        cModel.websiteId = $routeParams.wid;
        cModel.pageId = $routeParams.pid;
        cModel.updatePage = updatePage;
        cModel.deletePage = deletePage;
        init();

        function init() {
            cModel.page = PageService.findPageById(cModel.pageId);
        }

        function updatePage(page) {
            cModel.updateStats = PageService.updatePage(cModel.pageId, page);
        }

        function deletePage(pageId) {
            var result = PageService.deletePage(pageId);
            if(result) {
                $location.url("/user/"+cModel.userId+"/website/"+cModel.websiteId+"/page");
            } else {
                cModel.error = "Unable to delete page";
            }
        }
    }
})();