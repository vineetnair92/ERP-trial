(function () {
    angular
        .module('WebAppMaker')
        .controller("OrderController", OrderController)


    function OrderController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.company=$routeParams["cid"]
        vm.back = back;
        vm.profile = profile;
        vm.clear = clear;

        function init() {

            WebsiteService
                .findOrdersByCompany(vm.company)
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