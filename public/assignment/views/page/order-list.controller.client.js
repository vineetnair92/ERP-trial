(function () {
    angular
        .module('WebAppMaker')
        .controller("OrderListController", OrderListController)


    function OrderListController($routeParams, OrderService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        vm.back = back;
        vm.profile = profile;
        vm.clear = clear;

        function init() {

            OrderService
                .findOrdersByPageId(vm.pageId)
                .then(function (response) {
                    vm.orders = response.data;
                }, function (error) {
                    vm.alert = "Unable to find widgets for page";
                });
        }

        init();

        function back() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
        }

        function profile() {
            $location.url("/user/" + vm.userId);
        }

        function clear() {
            vm.alert = "";
            vm.success = "";
        }
    }

})();