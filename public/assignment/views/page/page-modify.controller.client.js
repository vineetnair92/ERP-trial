(function () {
    angular
        .module("TexApp")
        .controller("ModifyPageController", ModifyPageController);

    var pageOrdersUpdateError = "Error updating pages references in websites";

    function ModifyPageController($location, $routeParams, OrderService, PageService) {
        var cModel = this;
        cModel.userId = $routeParams.uid;
        cModel.websiteId = $routeParams.wid;
        cModel.pageId = $routeParams.pid;
        cModel.CreateOrder = CreateOrder;
        cModel.back=back;
        cModel.profile = profile;
        cModel.clear = clear;


        function CreateOrder(order) {
            OrderService
                .createOrder(cModel.pageId, order)
                .then(function (response) {
                    var order = response.data;
                    if (order) {
                        var _orderId = order._id;
                        updatePageReferencesInWebsite(_orderId);
                    } else {
                        cModel.error = "Unable to create page";
                    }
                })
                .catch(function (error) {
                    cModel.error = "Something went wrong!!"
                })
        }


        function updatePageReferencesInWebsite(orderId) {
            PageService
                .findPageById(cModel.pageId)
                .then(function (response) {
                    var page = response.data;
                    if (page) {
                        page.orders.push(orderId);
                        PageService
                            .updatePage(cModel.pageId, page)
                            .then(function (response) {
                                if (response.status === 200) {
                                    $location.url("/user/" + cModel.userId + "/website/" + cModel.websiteId + "/page");
                                     }
                                else {
                                    cModel.error = pageOrdersUpdateError;
                                }
                            })
                            .catch(function (error) {
                                cModel.error = pageOrdersUpdateError;
                            });

                    }
                    else {
                        cModel.error = pageOrdersUpdateError;
                    }
                })
                .catch(function (error) {
                    cModel.error = pageOrdersUpdateError;
                });
        }


        function back() {
            $location.url("/user/" + cModel.userId + "/website/" + cModel.websiteId + "/page/");
        }

        function profile() {
            $location.url("/user/" + cModel.userId);
        }


        function clear() {
            cModel.success = "";
            cModel.alert = "";
        }
    }
})();