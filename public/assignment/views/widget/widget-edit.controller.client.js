(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);

    function EditWidgetController($location, $routeParams, WidgetService) {
        //console.log("In edit widget");
        var cModel = this;
        cModel.userId = $routeParams.uid;
        cModel.websiteId = $routeParams.wid;
        cModel.pageId = $routeParams.pid;
        cModel.widgetId = $routeParams.wgid
        cModel.updateWidget = updateWidget;
        cModel.deleteWidget = deleteWidget;

        init();

        function init() {
            WidgetService
                .findWidgetById(cModel.widgetId)
                .then(function (response) {
                    cModel.widget = response.data;
                })
        }

        function updateWidget(widget) {

            if(!widget.name) {
                cModel.error = "Error Update!"
                cModel.inputmsg = "*required field"
                $location.url("/user/" + cModel.userId + "/website/" + cModel.websiteId + "/page/" + cModel.pageId + "/widget/"+widget._id);
            }
            else {
                WidgetService
                    .updateWidget(cModel.widgetId, widget)
                    .then(function (response) {
                        var updateStats = response.status;
                        if (updateStats == 200) {
                            $location.url("/user/" + cModel.userId + "/website/" + cModel.websiteId + "/page/" + cModel.pageId + "/widget");
                        } else {
                            cModel.error = "Unable to update widget";
                        }
                    })
                    .catch(function (response) {
                        cModel.error = "Unable to update widget";
                    })
            }
        }

        function deleteWidget(widgetId) {
            WidgetService
                .deleteWidget(widgetId)
                .then(function (response) {
                    var result = response.status;
                    if (result == 200) {
                        $location.url("/user/" + cModel.userId + "/website/" + cModel.websiteId + "/page/" + cModel.pageId + "/widget");
                    } else {
                        cModel.error = "Unable to delete widget";
                    }
                });
        }

    }
})();