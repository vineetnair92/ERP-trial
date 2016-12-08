(function () {
    angular
        .module("WebAppMaker")
        .factory("CompanyListService", CompanyListService);

    function CompanyListService($http) {
        var api = {
            findCompanyExists: findCompanyExists
        };
        return api;


        function findCompanyExists(companyname) {
            var attr1 = "company=" + companyname;
            var url = "/api/companylist?" + attr1;
            console.log("SERVICE CLIENT!!");
            return $http.get(url);
        }
    }

})();