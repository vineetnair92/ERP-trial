module.exports = function (db_assignment) {

    var mongoose = require("mongoose");
    var OrderSchema = require("./order.schema.server.js")();
    var Order = db_assignment.model("Order", OrderSchema);
    var api = {
        createorder: createorder,
        findAllOrdersforPage: findAllOrdersforPage,
        findOrderbyId: findOrderbyId
    };
    return api;


    function createorder(page) {
        console.log("Create page in model");
        console.log(page);
        return Order.create(page);
    }

    function findAllOrdersforPage(pageId) {
        return Order.find({_page: pageId});
    }

    function findOrderbyId(orderId) {
        return Order.findById({_id: orderId});
    }

}