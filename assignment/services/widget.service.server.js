module.exports = function (app, models) {

    var multer = require('multer');
    var upload = multer({dest: __dirname + '/../../public/uploads'});
    var widgetModel = models.widgetModel;
    var pageModel = models.pageModel;

    var widgets = [
        {"_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "Gizmodo"},
        {"_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        {
            "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"
        },
        {
            "_id": "456",
            "widgetType": "HTML",
            "pageId": "321",
            "text": '<p class="first-text">Investing in undersea internet cables has been a <a href="http://gizmodo.com/why-more-technology-giants-are-paying-to-lay-their-own-1703904291">big part of data strategy </a>plans for tech giants in recent years. Now Microsoft and Facebook are teaming up for the mother of all cables: A 4,100-mile monster that can move 160 Tbps, which will make it the highest-capacity cable on Earth. The cable even has a name, MAREA, and it will break ground (break waves?) later this year. Hopefully it can handle all your selfies.</p>'
        },
        {"_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        {
            "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E"
        },
        {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];
    var HEADER = 'HEADER';
    var IMAGE = 'IMAGE';
    var YOUTUBE = 'YOUTUBE';

    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.post("/api/upload", upload.single('myFile'), uploadImage);

    function createWidget(req, res) {
        var newWidget = req.body;
        widgetModel
            .createWidget(newWidget)
            .then(function (page) {
                res.json(page);
            })
            .catch(function (error) {
                res.status(400).send(error);
            });
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;
        widgetModel
            .findAllWidgetsForPage(pageId)
            .then(function (widgets) {
                res.json(widgets);
            })
            .catch(function (error) {
                res.status(400).send(error);
            });
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        widgetModel
            .findWidgetById(widgetId)
            .then(function (widget) {
                res.json(widget);
            })
            .catch(function (error) {
                res.status(400).send(error);
            });
    }

    function updateWidget(req, res) {
        var widget = req.body;
        var widgetId = req.params.widgetId;
        delete widget._id;
        widgetModel
            .updateWidget(widgetId, widget)
            .then(function (response) {
                res.send(response);
            })
            .catch(function (error) {
                res.status(400).send(error);
            })
    }


    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        widgetModel
            .findWidgetById(widgetId)
            .then(function (widget) {
                widgetModel
                    .deleteWidget(widgetId)
                    .then(function (response) {
                        pageModel
                            .deleteWidgetForPage(widget._page, widgetId)
                            .then(function (response) {
                                res.send(response);
                            })
                            .catch(function (error) {
                                res.status(400).send(error);
                            })

                    })
                    .catch(function (error) {
                        res.status(400).send(error);
                    });
            })
            .catch(function (error) {
                res.status(400).send(error);
            });
    }

    function uploadImage(req, res) {

        var imageName = req.body.imageName;
        var imageText = req.body.imageText;

        var widgetId = req.body.widgetId;
        var width = req.body.width;
        var myFile = req.file;

        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;


        if (myFile) {
            var originalname = myFile.originalname; // file name on user's computer
            var filename = myFile.filename;     // new file name in upload folder
            var path = myFile.path;         // full path of uploaded file
            var destination = myFile.destination;  // folder where file is saved to
            var size = myFile.size;
            var mimetype = myFile.mimetype;


            updateWidgetImageUrl(imageName, imageText, width, widgetId, filename, userId, websiteId, pageId, res);
        }


    }

    function updateWidgetImageUrl(imageName, imageText, width, widgetId, filename, userId, websiteId, pageId, res) {
        widgetModel.findWidgetById(widgetId)
            .then(function (widget) {
                widget.name = imageName;
                widget.text = imageText;
                widget.width = width;
                widget.url = "/uploads/"+filename;
                widgetModel
                    .updateWidget(widgetId, widget)
                    .then(function (response) {
                        res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);
                    })
                    .catch(function (error) {
                        console.error(error);
                    })
            })
            .catch(function (error) {
                console.error(error);
            })



    }


};