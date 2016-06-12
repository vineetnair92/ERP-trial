(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController);

    var HEADER = 'HEADER';
    var IMAGE = 'IMAGE';
    var YOUTUBE = 'YOUTUBE';
    var pageWidgetsUpdateError = "Error updating widgets references in pages";
    function NewWidgetController($location, $routeParams, WidgetService, PageService) {
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
                        type: HEADER
                    };
                    createWidget(cModel.pageId, newWidget);
                    break;
                case IMAGE   :
                    console.log("Image Chosen");
                    var newWidget = {
                        type: IMAGE
                    };
                    createWidget(cModel.pageId, newWidget);
                    break;
                case YOUTUBE   :
                    console.log("Youtube Chosen");
                    var newWidget = {
                        type: YOUTUBE
                    };
                    createWidget(cModel.pageId, newWidget);
                    break;
                default :
                    console.log("Error !! Invalid Widget Type ");
            }
        }

        function createWidget(pageId, widget) {
            WidgetService
                .findWidgetsByPageId(pageId)
                .then(function (response) {
                    var widgets = response.data;
                    var newRank = widgets.length + 1;
                    widget.rank = newRank;
                    WidgetService
                        .createWidget(pageId, widget)
                        .then(function (response) {
                            var widget = response.data;
                            if(widget){
                                var _widgetId = widget._id;
                                updateWidgetReferencesInPage(_widgetId);
                            }
                            else{
                                cModel.error = "Unable to create widget";
                            }
                        })
                        .catch(function(error){
                            cModel.error = "Something went wrong!!"
                        })
                })
                .catch(function (error) {
                    cModel.error = "Something went wrong!!"
                })





        }

        function updateWidgetReferencesInPage(widgetId) {
            PageService
                .findPageById(cModel.pageId)
                .then(function (response) {
                    var page = response.data;
                    if (page) {
                        page.widgets.push(widgetId);
                        PageService
                            .updatePage(cModel.pageId, page)
                            .then(function (response) {
                                if (response.status === 200) {
                                    $location.url(widgetEditUrl + widgetId);
                                }
                                else {
                                    cModel.error = pageWidgetsUpdateError;
                                }
                            })
                            .catch(function (error) {
                                cModel.error = pageWidgetsUpdateError;
                            });

                    }
                    else {
                        cModel.error = pageWidgetsUpdateError;
                    }
                })
                .catch(function (error) {
                    cModel.error = pageWidgetsUpdateError;
                });
        }
    }

})();