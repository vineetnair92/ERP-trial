(function(){
    angular
        .module("wamDirectives",[])
        .directive("wamSortable", wamSortable);


    function wamSortable() {
        var start = -1;
        var end = -1;

        function linker(scope, element, attributes) {
            console.log("Inside directve");
            element.sortable({
                axis: 'y',
                handle: ".handleSort",
                start: function (event, ui) {
                    console.log("in start")
                    start = ui.item.index();
                },
                stop: function (event, ui) {
                    console.log("in end")
                    end = ui.item.index();
                    scope.wamCallback({
                        start: start,
                        end: end
                    });
                }
            });
        }

        return {
            scope: {
                wamCallback: '&'
            },
            link: linker
        }
    }

})();