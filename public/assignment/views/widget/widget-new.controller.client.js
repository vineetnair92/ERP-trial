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
                    createWidget(cModel.pageId, newWidget);
                    break;
                case IMAGE   :
                    console.log("Image Chosen");
                    var newWidget = {
                        _id: (new Date()).getTime() + "",
                        widgetType: IMAGE
                    };
                    createWidget(cModel.pageId, newWidget);
                    break;
                case YOUTUBE   :
                    console.log("Youtube Chosen");
                    var newWidget = {
                        _id: (new Date()).getTime() + "",
                        widgetType: YOUTUBE
                    };
                    createWidget(cModel.pageId, newWidget);
                    break;
                default :
                    console.log("Error !! Invalid Widget Type ");
            }
        }

        function createWidget(pageId, widget) {
            WidgetService
                .createWidget(pageId, widget)
                .then(function (response) {
                    $location.url(widgetEditUrl + widget._id);
                })
        }
    }

})();