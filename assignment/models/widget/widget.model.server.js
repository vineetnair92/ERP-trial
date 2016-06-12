module.exports = function () {

    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server.js")();
    var Widget = mongoose.model("Widget", WidgetSchema);
    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        reorderWidget: reorderWidget,
        resetWidgetsRank: resetWidgetsRank
    };
    return api;


    function createWidget(widget) {
        console.log("Create widget in model");
        return Widget.create(widget);
    }

    function findAllWidgetsForPage(pageId) {
        return Widget.find({_page: pageId});
    }

    function findWidgetById(widgetId) {

        return Widget.findById({_id: widgetId});
    }

    function updateWidget(widgetId, widget) {

        return Widget.update({_id: widgetId},
            {
                $set: {
                    _page: widget._page,
                    type: widget.type,
                    name: widget.name,
                    text: widget.text,
                    placeholder: widget.placeholder,
                    description: widget.description,
                    url: widget.url,
                    width: widget.width,
                    height: widget.height,
                    rows: widget.rows,
                    size: widget.size,
                    class: widget.class,
                    icon: widget.icon,
                    deletable: widget.deletable,
                    formatted: widget.formatted,
                }
            });
    }


    function deleteWidget(widgetId) {

        return Widget.remove({_id: widgetId})

    }

    function reorderWidget(pageId, start, end, res){
        start++;
        end++;
        Widget
            .find({_page: pageId})
            .then(function (widgets) {
                widgets.forEach(function(widget){
                    if(start > end) {
                        if(widget.rank >= end && widget.rank < start) {
                            widget.rank++;
                            widget.save(function(){});
                        } else if(widget.rank === start) {
                            widget.rank = end;
                            widget.save(function(){});
                        }
                    } else {
                        if(widget.rank > start && widget.rank <= end) {
                            widget.rank--;
                            widget.save(function(){});
                        } else if(widget.rank === start) {
                            widget.rank = end;
                            widget.save(function(){});
                        }
                    }
                })
                res.json(widgets);
            })
            .catch(function (error) {
                console.log(error)
                res.status(400).send();
            })
    }
    
    function resetWidgetsRank(pageId, widgetRank, res) {
        Widget
            .find({_page: pageId})
            .then(function (widgets) {
                widgets.forEach(function(widget){
                    if(widget.rank > widgetRank) {
                        widget.rank--;
                        widget.save(function(){});
                    }
                });
                res.status(200).send(widgets);
            })
            .catch(function (error) {
                console.log(error)
                res.status(400).send();
            })
    }
}