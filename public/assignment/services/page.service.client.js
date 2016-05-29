(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    var pages = [
        {"_id": "321", "name": "Post 1", "websiteId": "456"},
        {"_id": "432", "name": "Post 2", "websiteId": "456"},
        {"_id": "543", "name": "Post 3", "websiteId": "456"}
    ];

    function PageService() {
        var api = {
            createPage: createPage,
            deletePage: deletePage,
            updatePage: updatePage,
            findPageByWebsiteId: findPageByWebsiteId
        };
        return api;

        function deletePage(pageId) {

        }

        function createPage(websiteId, page) {

        }

        function findPageByWebsiteId(websiteId) {
            var resultSet = [];
            for (var i in pages) {
                if (pages[i].websiteId === websiteId) {
                    resultSet.push(pages[i]);
                }
            }
            return resultSet;
        }


        function updatePage(pageId, page) {

        }

    }
})();