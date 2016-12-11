(function () {
    angular
        .module('TexApp')
        .controller("OrderController", OrderController)


    function OrderController($routeParams, PageService, CompanyListService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.company=$routeParams["cid"]
        vm.back = back;
        vm.profile = profile;
        vm.clear = clear;

        function init() {
            CompanyListService.findCompanyExists(vm.company)
                .then(function (res){
                    console.log("Company ID from List");
                    console.log(res.data);
                    var id = res.data[0]._web;
                PageService
                    .findAllPagesForWebsite(id)
                    .then(function (response) {
                        console.log("HERE ");
                        console.log(response.data);
                        vm.orders = response.data;
                    }, function (error) {
                        vm.alert = "Unable to find widgets for page";
                    });
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