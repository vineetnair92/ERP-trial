(function () {
    angular
        .module('WebAppMaker')
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {
        var cModel = this;
        cModel.userId = $routeParams.uid;

        init();

        function init() {
            cModel.websites = WebsiteService.findWebsitesByUser(cModel.userId);
            console.log(cModel.websites);
        }
    }

})();