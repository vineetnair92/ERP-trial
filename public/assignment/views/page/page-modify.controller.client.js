(function () {
    angular
        .module("WebAppMaker")
        .controller("ModifyPageController", ModifyPageController);

    var pageOrdersUpdateError = "Error updating pages references in websites";

    function ModifyPageController($location, $routeParams, OrderService, PageService) {
        var cModel = this;
        cModel.userId = $routeParams.uid;
        cModel.pageId = $routeParams.pid;
        cModel.createOrder = createOrder;


        function createOrder(order) {
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
                                    $location.url("/user/" + cModel.userId + "/website/" + cModel.websiteId + "/page" + cModel.pageId + "/order");
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

    }
})();