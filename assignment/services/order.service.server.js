module.exports = function (app, models) {

    var orderModel = models.orderModel;
    app.post("/api/page/:pid/order", createOrder);
    app.get("/api/page/:pid/order", findAllOrdersForPage);
    app.get("/api/order/:orderId", findOrderById);

    function createOrder(req, res) {
        var newOrder = req.body;
        orderModel
            .createorder(newOrder)
            .then(function (order) {
                res.json(order);
            })
            .catch(function (error) {
                res.status(400).send(error);
            });
    }

    function findAllOrdersForPage(req, res) {
        var pageId = req.params.pid;
        orderModel
            .findAllOrdersforPage(pageId)
            .then(function (orders) {
                res.json(orders);
            })
            .catch(function (error) {
                res.status(400).send(error);
            });

    }

    function findOrderById(req, res) {
        var orderId = req.params.orderId;
        orderModel
            .findOrderbyId(orderId)
            .then(function (order) {
                res.json(order);
            })
            .catch(function (error) {
                res.status(400).send(error);
            });
    }

};