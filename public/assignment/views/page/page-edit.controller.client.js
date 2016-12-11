(function () {
    angular
        .module("TexApp")
        .controller("EditPageController", EditPageController)
//        .controller('DropDownController', ['$scope', function($scope) {
//        $scope.data = {
//            singleSelect: null,
//        };
//        }])
;


    function EditPageController($location, $routeParams, PageService) {
        console.log("In edit page");
        var cModel = this;
        cModel.userId = $routeParams.uid;
        cModel.websiteId = $routeParams.wid;
        cModel.pageId = $routeParams.pid;
        cModel.updatePage = updatePage;
        cModel.deletePage = deletePage;
        init();

        function init() {
            PageService
                .findPageById(cModel.pageId)
                .then(function (response) {
                    cModel.page = response.data;
                });
        }

        function updatePage(page) {
            PageService
                .updatePage(cModel.pageId, page)
                .then(function (response) {
                    var updateStats = response.status;
                    if (updateStats) {
                        $location.url("/user/" + cModel.userId + "/website/" + cModel.websiteId + "/page");
                    } else {
                        cModel.error = "Unable to update page";
                    }
                })
                .catch(function (response) {
                    cModel.error = "Unable to update page";
                });
        }

        function deletePage(pageId) {
            PageService
                .deletePage(pageId)
                .then(function (response) {
                    var result = response.status;
                    if (result == 200) {
                        $location.url("/user/" + cModel.userId + "/website/" + cModel.websiteId + "/page");
                    } else {
                        cModel.error = "Unable to delete page";
                    }
                })
                .catch(function (response) {
                    cModel.error = "Unable to delete page";
                });

        }
    }
})();