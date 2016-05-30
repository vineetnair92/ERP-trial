(function(){
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);

    function EditWidgetController($location, $routeParams, WidgetService) {
        console.log("In edit widget");
        var cModel = this;
        cModel.userId = $routeParams.uid;
        cModel.websiteId = $routeParams.wid;
        cModel.pageId = $routeParams.pid;
        cModel.widgetId = $routeParams.wgid
        cModel.updateWidget = updateWidget;
        cModel.deleteWidget = deleteWidget;
        init();

        function init() {
            cModel.widget = WidgetService.findWidgetById(cModel.widgetId);
        }

        function updateWidget(widget) {
            cModel.updateStats = WidgetService.updateWidget(cModel.widgetId, widget);
        }

        function deleteWidget(widgetId) {
            var result = WidgetService.deleteWidget(widgetId);
            if(result) {
                $location.url("/user/"+cModel.userId+"/widget");
            } else {
                cModel.error = "Unable to delete widget";
            }
        }
    }
})();