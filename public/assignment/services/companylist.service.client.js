(function () {
    angular
        .module("TexApp")
        .factory("CompanyListService", CompanyListService);

    function CompanyListService($http) {
        var api = {
            findCompanyExists: findCompanyExists,
            createCompanyList:createCompanyList
        };
        return api;


        function findCompanyExists(companyname) {
            var attr1 = "company=" + companyname;
            var url = "/api/companylist?" + attr1;
            console.log("SERVICE CLIENT!!");
            return $http.get(url);
        }

        function createCompanyList(websiteId, website) {
            var newCompany = {
                //_id: (new Date()).getTime() + "",
                _web:websiteId,
                company: website.name
            };
            var url = "/api/companylist";
            return $http.post(url, newCompany);

        }
    }

})();