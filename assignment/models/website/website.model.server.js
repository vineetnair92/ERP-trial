module.exports = function () {

    var mongoose = require("mongoose");
    var WebsiteSchema = require("./website.schema.server.js")();
    var Website = mongoose.model("Website", WebsiteSchema);
    var User = mongoose.model("User");
    var api = {
        createWebsiteForUser: createWebsiteForUser,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite
    };
    return api;

    // pre hook function to delete website references in the user array when website.remove() is called
    /*WebsiteSchema.pre('remove', function (next) {
        this.model('User').update(
            {_id: this._user},
            {$pull: {websites: this._id}},
            {multi: true},
            next
        );
    });*/

    function createWebsiteForUser(website) {
        console.log("Create website in model");

        /*Website
            .findOne({name: "w2"})
            .populate('_user')
            .exec(function (err, website) {
                if(err) console.log("Errorrrrrrrr");
                else {
                    if(!website)
                    console.log(website._user.username);
                }
            });*/

        return Website.create(website);
    }

    function findAllWebsitesForUser(userId) {
        return Website.find({_user: userId});
    }
    
    function findWebsiteById(websiteId) {
        
        return Website.findById({_id: websiteId});
    }
    
    function updateWebsite(websiteId, website) {

        return Website.update({_id: userId},
            {
                $set: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone
                }
            });
    }


    function deleteWebsite(websiteId) {
     /*  return Website.findOne({_id:websiteId})
            .then(function (website) {
                website
                    .remove(function (err) {    // this function invokes when next is passed with an Error
                        console.log(err)
                    })
                    .then(function (response) {
                        console.log(response);
                    })

            });*/

        var userId;
        return Website.findById({_id: websiteId},function (err, website) {
            if(err) {
                console.log("Error in deleteWebsite,FindOne : " + err)
                return new Error(err);
            }
            else {
                userId = website._user;
                User.update({_id: userId},
                    {$pullAll : {
                        "websites": [websiteId]
                    }},
                    { safe: true })
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

               Website.remove({_id: websiteId})
                   .then(function (response) {
                       console.log(response);
                   })
                   .catch(function (error) {
                       console.log(error);
                   })
            }
        });
    }
}