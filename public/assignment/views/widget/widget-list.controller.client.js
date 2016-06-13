(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($sce, $routeParams, WidgetService) {
        var cModel = this;
        cModel.pageId = $routeParams.pid;
        cModel.userId = $routeParams.uid;
        cModel.websiteId = $routeParams.wid;
        cModel.getSafeHtml = getSafeHtml;
        cModel.getSafeUrl = getSafeUrl;
        cModel.sort = sort;

        function init() {
            WidgetService
                .findWidgetsByPageId(cModel.pageId)
                .then(function (response) {
                    cModel.widgets = response.data;
                })
        }

        init();

        function getSafeHtml(widget) {
            return $sce.trustAsHtml(widget.text);
        }

        function getSafeUrl(widget) {
            var urlParts = widget.url.split("/");
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);

        }

        function sort(start, end) {

            console.log("WidgetListController start=" + start + " end=" + end);
            WidgetService
                .reorderWidget(cModel.pageId, start, end)
                .then(function (response) {
                    if (response)
                        cModel.widgets = response.data;
                })
                .catch(function (error) {
                    cModel.error = "Error rendering widgets!";
                })
        }


    }
})();

console.log("WOWWWWWWWW");

