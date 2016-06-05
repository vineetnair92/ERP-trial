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

                PageService
                    .findPageByWebsiteId(cModel.websiteId)
                    .then(function(response) {
                        cModel.pages = response.data;
                    });
        }
    }

})();