
(function () {
    angular
        .module("TexApp")
        .controller("ProjectController", ProjectController);

    function ProjectController($routeParams,UserService) {
        function init()
        {
            console.log("HI");
        }
    init();
    }

})();