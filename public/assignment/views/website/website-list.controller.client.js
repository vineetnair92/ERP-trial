(function () {
    angular
        .module('TexApp')
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {
        var cModel = this;
        cModel.userId = $routeParams.uid;

        init();

        function init() {
            WebsiteService
                .findWebsitesByUser(cModel.userId)
                .then(function (response) {
                    cModel.websites = response.data;
                })
        }
    }

})();