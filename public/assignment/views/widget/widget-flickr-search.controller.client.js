(function () {
    angular
        .module("WebAppMaker")
        .controller("FlickrSearchController", FlickrSearchController);

    function FlickrSearchController($routeParams, $location, FlickrService, WidgetService) {
        var cModel = this;
        cModel.userId = $routeParams.uid;
        cModel.websiteId = $routeParams.wid;
        cModel.pageId = $routeParams.pid;
        cModel.widgetId = $routeParams.wgid;
        cModel.searchPhotos = searchPhotos;
        cModel.selectPhoto = selectPhoto;
        var widget;
        init();
        function init() {

            WidgetService
                .findWidgetById(cModel.widgetId)
                .then(function (response) {
                    widget = response.data;
                })
        }

        function searchPhotos(searchText) {
            FlickrService
                .searchPhotos(searchText)
                .then(function (response) {
                    data = response.data.replace("jsonFlickrApi(", "");
                    data = data.substring(0, data.length - 1);
                    data = JSON.parse(data);
                    cModel.photos = data.photos;
                });
        }

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            widget.url = url;
            WidgetService
                .updateWidget(cModel.widgetId, widget)
                .then(function (response) {
                    if (response.status == 200) {
                        $location
                            .url("/user/" + cModel.userId + "/website/" + cModel.websiteId + "/page/" + cModel.pageId + "/widget/" + cModel.widgetId);
                    }
                });

        }
    }
})();