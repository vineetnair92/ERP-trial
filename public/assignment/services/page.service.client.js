(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService($http) {
        var api = {
            createPage: createPage,
            deletePage: deletePage,
            updatePage: updatePage,
            findPageByWebsiteId: findPageByWebsiteId,
            findPageById: findPageById,
            findAllPagesForWebsite: findAllPagesForWebsite
        };
        return api;

        function createPage(websiteId, page) {
            var newPage = {
                SlNo: page.SlNo,
                description:page.description,
                _website: websiteId
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

        function findAllPagesForWebsite(websiteId) {
            var url="/api/website/" + websiteId+ "/page";
            return $http.get(url);
        }

    }
})();