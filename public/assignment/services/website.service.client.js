(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService($http) {
        var api = {
            createWebsite: createWebsite,
            findWebsitesByUser: findWebsitesByUser,
            deleteWebsite: deleteWebsite,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite,
            findOrdersByCompany:findOrdersByCompany
        };
        return api;

        function deleteWebsite(websiteId) {
            var url = "/api/website/" + websiteId;
            return $http.delete(url);
        }

        function createWebsite(userId, website) {
            var newWebsite = {
                //_id: (new Date()).getTime() + "",
                name: website.name,
                description: website.description,
                _user: userId
            };
            var url = "/api/user/" + userId + "/website";
            return $http.post(url, newWebsite);

        }

        function findWebsitesByUser(userId) {
            var url = "/api/user/" + userId + "/website";
            return $http.get(url);
        }

        function findWebsiteById(websiteId) {
            var url = "/api/website/" + websiteId;
            return $http.get(url);
        }

        function updateWebsite(websiteId, website) {
            var url = "/api/website/" + websiteId;
            return $http.put(url, website);
        }

        function findOrdersByCompany(company) {
            var url= "/api/website/"+company;
            return $http.get(url);
        }
    }
})();