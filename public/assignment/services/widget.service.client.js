(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    var widgets = [
        {"_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "Gizmodo"},
        {"_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        {
            "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"
        },
        {
            "_id": "456",
            "widgetType": "HTML",
            "pageId": "321",
            "text": '<p class="first-text">Investing in undersea internet cables has been a <a href="http://gizmodo.com/why-more-technology-giants-are-paying-to-lay-their-own-1703904291">big part of data strategy </a>plans for tech giants in recent years. Now Microsoft and Facebook are teaming up for the mother of all cables: A 4,100-mile monster that can move 160 Tbps, which will make it the highest-capacity cable on Earth. The cable even has a name, MAREA, and it will break ground (break waves?) later this year. Hopefully it can handle all your selfies.</p>'
        },
        {"_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        {
            "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E"
        },
        {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

    var HEADER = 'HEADER';
    var IMAGE = 'IMAGE';
    var YOUTUBE = 'YOUTUBE';

    function WidgetService($http) {
        var api = {
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            createWidget: createWidget,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget
        };
        return api;

        function findWidgetsByPageId(pageId) {
            var url = "/api/page/" + pageId + "/widget";
            return $http.get(url);
            /* if (resultSet.length)
             return resultSet;
             else
             return null;*/
        }

        function findWidgetById(widgetId) {
         var url = "/api/widget/"+widgetId;
         return $http.get(url);
        }

        function createWidget(pageId, widget) {
            var url = "/api/page/"+pageId+"/widget";
            widget._page = pageId;
            return $http.post(url, widget);

        }

        function deleteWidget(widgetId) {
            var url = "/api/widget/"+widgetId;
            return $http.delete(url);

        }

        function updateWidget(widgetId, widget) {
             var url = "/api/widget/"+widgetId;
             return $http.put(url, widget);
        }

    }
})();