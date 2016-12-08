module.exports = function (app, models) {

    var companyListModel = models.companyListModel;

    app.get("/api/companylist", findCompanyExists);


    function findCompanyExists(req, res) {
        var CompanyName = req.query.company;
        console.log(CompanyName);
        companyListModel
            .findCompanyExists(CompanyName)
            .then(function (response) {
                console.log(response);
                res.json(response);
            })
            .catch(function (error) {
                res.status(400).send(error);
            });
    }

};