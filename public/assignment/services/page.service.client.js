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
            findPageById: findPageById
        };
        return api;

        function createPage(websiteId, page) {
            var newPage = {
                SlNo: page.SlNo,
                description:page.description,
                diameter: page.diameter,
                clothdesc: page.clothdesc,
                color: page.color,
                actualWeight:parseInt(page.actualWeight),
                pdcWeight:parseInt(page.pdcWeight),
                actualRolls:parseInt(page.actualRolls),
                pdcRolls:parseInt(page.pdcRolls),
                uom:page.uom,
                Remarks:page.Remarks,
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


    }
})();