(function () {
    angular
        .module('TrafficPost')
        .controller("LocationPostListController", LocationPostListController);

    function LocationPostListController($routeParams, LocationService, UserService, LocationPostService) {
        var cModel = this;
        cModel.userId = $routeParams.uid;
        cModel.locId= $routeParams.locId;
        cModel.deleteLocationPost = deleteLocationPost;

        init();

        function init() {
            console.log("LocPost list Controller");
            LocationPostService
                .findAllLocationPostForUserLocation(cModel.userId, cModel.locId)
                .then(function (response) {
                        if(response.data) {
                            cModel.locationPosts = response.data;
                        }
                        else{
                            cModel.err = "Error Finding Location Posts for this user and location";
                        }
                },
                function (err) {
                   cModel.err = "Error Finding Location Posts for this user and location";
                });
        }
        
        function deleteLocationPost(locPostId) {
            LocationPostService
                .deleteLocationPost(locPostId)
                .then(function(response){
                    if(response.status == 200) {
                        return UserService
                               .deleteEndorsedPost(locPostId)
                        init();
                    }
                    else {
                        cModel.error = "Error Delete Location Post !!";
                    }
                }, function (err) {
                  cModel.err = "Error Delete Location Post !!";
                });
        }

    }

})();