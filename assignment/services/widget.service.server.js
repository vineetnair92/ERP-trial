module.exports = function (app) {

    var multer = require('multer');
    var upload = multer({dest: __dirname + '/../../public/uploads'});


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
        widgets.push(newWidget);
        res.sendStatus(200);
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;
        var resultSet = [];
        for (var i in widgets) {
            if (widgets[i].pageId === pageId) {
                resultSet.push(widgets[i]);
            }
        }

        res.json(resultSet);
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        for (var i in widgets) {
            if (widgets[i]._id === widgetId) {
                res.send(widgets[i]);
                return;
            }
        }

        res.send(null);
    }

    function updateWidget(req, res) {
        var widget = req.body;
        var widgetId = req.params.widgetId;
        for (var i in widgets) {
            if (widgets[i]._id === widgetId) {
                switch (widgets[i].widgetType) {
                    case HEADER:
                        updateHeaderWidget(widgets[i], widget);
                        res.sendStatus(200);
                        return;
                        break;
                    case IMAGE:
                        updateImageWidget(widgets[i], widget);
                        res.sendStatus(200);
                        return;
                        break;
                    case YOUTUBE:
                        updateYTubeWidget(widgets[i], widget);
                        res.sendStatus(200);
                        return;
                        break;
                    default :
                        return false;
                }
            }
        }
        res.sendStatus(400);
    }

    function updateHeaderWidget(oldWidget, newWidget) {
        oldWidget.name = newWidget.name;
        oldWidget.size = newWidget.size;
        oldWidget.text = newWidget.text;
    }

    function updateImageWidget(oldWidget, newWidget) {
        oldWidget.name = newWidget.name;
        oldWidget.text = newWidget.text;
        oldWidget.width = newWidget.width;
        oldWidget.url = newWidget.url;
    }

    function updateYTubeWidget(oldWidget, newWidget) {
        oldWidget.name = newWidget.name;
        oldWidget.text = newWidget.text;
        oldWidget.width = newWidget.width;
        oldWidget.url = newWidget.url;
    }


    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        for (var i in widgets) {
            if (widgets[i]._id === widgetId) {
                widgets.splice(i, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(400);
    }

    function uploadImage(req, res) {

        var widgetId = req.body.widgetId;
        var width = req.body.width;
        var myFile = req.file;

        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;
        
        if(myFile) {
            var originalname = myFile.originalname; // file name on user's computer
            var filename = myFile.filename;     // new file name in upload folder
            var path = myFile.path;         // full path of uploaded file
            var destination = myFile.destination;  // folder where file is saved to
            var size = myFile.size;
            var mimetype = myFile.mimetype;



            updateWidgetImageUrl(widgetId, filename);
        }

        res.redirect("/assignment/#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
    }

    function updateWidgetImageUrl(widgetId, filename) {
        for (var i in widgets) {
            if (widgets[i]._id === widgetId) {
                widgets[i].url = "/uploads/"+filename;
                return;
            }
        }
    }


};