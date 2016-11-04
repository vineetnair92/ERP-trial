module.exports = function (db_assignment) {

    var mongoose = require("mongoose");
    var OrderSchema = require("./order.schema.server.js")();
    var Order = db_assignment.model("Order", OrderSchema);
    var api = {
        createOrder: createOrder,
        findAllOrdersForPage: findAllOrdersForPage,
        findOrderById: findOrderById
    };
    return api;


    function createOrder(page) {
        console.log("Create page in model");
        return Order.create(page);
    }

    function findAllOrdersForPage(pageId) {
        return Order.find({_page: pageId});
    }

    function findOrderById(orderId) {
        return Order.findById({_id: orderId});
    }

}