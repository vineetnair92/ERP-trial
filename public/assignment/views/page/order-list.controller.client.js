(function () {
    angular
        .module('WebAppMaker')
        .controller("OrderListController", OrderListController)


    function OrderListController($routeParams, OrderService) {
        var cModel = this;
        cModel.userId = $routeParams.uid;
        cModel.pageId = $routeParams.wid;

        init();

        function init() {

            PageService
                .findOrderByPageId(cModel.pageId)
                .then(function (response) {
                    cModel.orders = response.data;
                });
        }
    }

})();