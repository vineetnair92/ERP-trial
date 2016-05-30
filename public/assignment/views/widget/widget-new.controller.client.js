(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController);

    var HEADER = 'HEADER';
    var IMAGE = 'IMAGE';
    var YOUTUBE = 'YOUTUBE';

    function NewWidgetController($location, $routeParams, WidgetService) {
        var cModel = this;
        cModel.userId = $routeParams.uid;
        cModel.websiteId = $routeParams.wid;
        cModel.pageId = $routeParams.pid;
        cModel.chooseWidget = chooseWidget;
        var widgetEditUrl = "/user/" + cModel.userId + "/website/" + cModel.websiteId + "/page/" + cModel.pageId + "/widget/";

        function chooseWidget(widgetType) {
            switch (widgetType) {
                case HEADER  :
                    console.log("Header Chosen");
                    var newWidget = {
                        _id: (new Date()).getTime() + "",
                        widgetType: HEADER
                    };
                    WidgetService.createWidget(cModel.pageId, newWidget);
                    $location.url(widgetEditUrl + newWidget._id);
                    break;
                case IMAGE   :
                    console.log("Image Chosen");
                    var headerWidget = {
                        _id: (new Date()).getTime() + "",
                        widgetType: IMAGE
                    };
                    WidgetService.createWidget(cModel.pageId, headerWidget);
                    $location.url(widgetEditUrl + headerWidget._id);
                    break;
                case YOUTUBE   :
                    console.log("Youtube Chosen");
                    var headerWidget = {
                        _id: (new Date()).getTime() + "",
                        widgetType: YOUTUBE
                    };
                    WidgetService.createWidget(cModel.pageId, headerWidget);
                    $location.url(widgetEditUrl + headerWidget._id);
                    break;
                default :
                    console.log("Error Choose");
            }
        }

    }

})();