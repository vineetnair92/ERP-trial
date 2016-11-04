(function () {
    angular
        .module("WebAppMaker")
        .factory("OrderService", OrderService);

    function OrderService($http) {
        var api = {
            createOrder: createOrder,
            findOrderByPageId: findOrderByPageId,
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
                actualWeight:parseInt(order.actualWeight),
                pdcWeight:parseInt(order.pdcWeight),
                actualRolls:parseInt(order.actualRolls),
                pdcRolls:parseInt(order.pdcRolls),
                uom:order.uom,
                Remarks:order.Remarks,
                _page: pageId
            };
            var url = "/api/page/" + pageId + "/order";
            return $http.post(url, newOrder);
        }

        function findOrderByPageId(pageId) {
            var url = "/api/page/" + pageId + "/order";
            return $http.get(url);

        }

        function findOrderById(orderId) {
            var url = "/api/order/" + orderId;
            return $http.get(url);
        }

    }
})();