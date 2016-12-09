(function () {
    angular
        .module('WebAppMaker')
        .controller("UpdateOrderStatusController", UpdateOrderStatusController)


    function UpdateOrderStatusController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        vm.back = back;
        vm.profile = profile;
        vm.clear = clear;
        vm.UpdateOrderStatus = UpdateOrderStatus;

        function init() {

            PageService
                .findPageById(vm.pageId)
                .then(function (response) {
                    vm.page = response.data;
                });
        }


        init();

        function UpdateOrderStatus(page) {
            PageService
                .updatePage(vm.pageId, page)
                .then(function (response) {
                    var updateStats = response.status;
                    if (updateStats) {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                    } else {
                        vm.error = "Unable to update page";
                    }
                })
                .catch(function (response) {
                    vm.error = "Unable to update page";
                });
        }

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