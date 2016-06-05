(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    var pages = [
        {"_id": "321", "name": "Post 1", "websiteId": "456"},
        {"_id": "432", "name": "Post 2", "websiteId": "456"},
        {"_id": "543", "name": "Post 3", "websiteId": "456"}
    ];

    function PageService($http) {
        var api = {
            createPage: createPage,
            deletePage: deletePage,
            updatePage: updatePage,
            findPageByWebsiteId: findPageByWebsiteId,
            findPageById: findPageById
        };
        return api;

        function createPage(websiteId, page) {
            var newPage = {
                _id: (new Date()).getTime() + "",
                name: page.name,
                title: page.title,
                websiteId: websiteId
            };
            var url = "/api/website/" + websiteId + "/page";
            return $http.post(url, newPage);
        }

        function deletePage(pageId) {
            var url = "/api/page/" + pageId;
            return $http.delete(url);
        }

        function updatePage(pageId, page) {
            var url = "/api/page/" + pageId;
            return $http.put(url, page);
        }

        function findPageByWebsiteId(websiteId) {
            var url = "/api/website/" + websiteId + "/page";
            return $http.get(url);

        }

        function findPageById(pageId) {
            var url = "/api/page/" + pageId;
            return $http.get(url);
        }


    }
})();