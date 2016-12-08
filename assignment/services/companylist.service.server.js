module.exports = function (app, models) {

    var companyListModel = models.companyListModel;

    app.post("/api/companylist", createCompanyList);
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


    function createCompanyList(req, res) {
        var newCompany = req.body;
        companyListModel.createCompanyList(newCompany)
            .then(function (order){
                res.json(order);
                console.log("Company Added");
            })
            .catch(function (error) {
                res.status(400).send(error);
            })
    }

};