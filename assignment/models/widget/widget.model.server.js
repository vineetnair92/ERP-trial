module.exports = function () {

    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server.js")();
    var Widget = mongoose.model("Widget", WidgetSchema);
    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget
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

}