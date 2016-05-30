(function () {
    angular
        .module('WebAppMaker')
        .controller("PageListController", PageListController);

    function PageListController($routeParams, PageService) {
        var cModel = this;
        cModel.userId = $routeParams.uid;
        cModel.websiteId = $routeParams.wid;

        init();

        function init() {
            cModel.pages = PageService.findPageByWebsiteId(cModel.websiteId)
            //console.log(cModel.pages);
        }
    }

})();