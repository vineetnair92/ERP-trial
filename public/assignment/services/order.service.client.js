(function () {
    angular
        .module("WebAppMaker")
        .factory("OrderService", OrderService);

    function OrderService($http) {
        var api = {
            createOrder: createOrder,
            findOrdersByPageId: findOrdersByPageId,
            findOrderById: findOrderById
        };
        return api;

        function createOrder(pageId, order) {
            var newOrder = {
                SlNo: order.SlNo,
                description:order.description,
                diameter: order.diameter,
                clothdesc: order.clothdesc,
                color: order.color,
                actualWeight:order.actualWeight,
                pdcWeight:order.pdcWeight,
                actualRolls:order.actualRolls,
                pdcRolls:order.pdcRolls,
                uom:order.uom,
                Remarks:order.Remarks,
                _page: pageId
            };
            var url = "/api/page/" + pageId + "/order";
            return $http.post(url, newOrder);
        }

        function findOrdersByPageId(pageId) {
            var url = "/api/page/" + pageId + "/order";
            return $http.get(url);

        }

        function findOrderById(orderId) {
            var url = "/api/order/" + orderId;
            return $http.get(url);
        }

    }
})();