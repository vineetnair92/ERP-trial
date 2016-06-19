var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var bcrypt = require("bcrypt-nodejs");

module.exports = function (app, models) {

    var userModel = models.userModel;
    /*var users = [
     {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
     {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
     {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
     {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
     ];*/


    //app.get("/api/user", getUsers);

    app.post("/api/user", createUser);
    app.get("/api/user/:userId", findUserById);
    app.post("/api/login",passport.authenticate('local'), login);
    app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.post('/api/logout', logout);
    app.post('/api/register', register);
    app.get('/api/isLoggedIn', isLoggedIn);
    app.get("/api/user", findUser);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);


    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/assignment/#/user',
            failureRedirect: '/assignment/#/login'
        }));

    var facebookConfig = {
        clientID     : process.env.FACEBOOK_CLIENT_ID,
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL  : process.env.FACEBOOK_CALLBACK_URL
    };

    passport.use(new LocalStrategy(localStrategy));
    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    
                    if(user && bcrypt.compareSync(password, user.password)) {
                        done(null, user);
                    } else {
                        done(null, false);
                    }
                },
                function(err) {
                    done(err);
                }
            );
    }

    function facebookStrategy(token, refreshToken, profile, done) {
        userModel
            .findUserByFacebookId(profile.id)
            .then(function (facebookUser) {
                if(facebookUser) {
                    done(null, facebookUser);
                }
                else {
                    facebookUser = {
                        username: profile.displayName.replace(/ /g,''),
                        facebook: {
                            token: token,
                            id: profile.id,
                            displayName: profile.displayName
                        }
                    };
                    userModel
                        .createUser(facebookUser)
                        .then(
                            function(user) {
                                done(null, user);
                            },
                            function (error) {
                                 done(error, null);
                            }
                        );
                }
            },
            function (error) {
                done(error, null);
            });
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logOut();
        res.status(200).send();
    }

    function register(req, res) {
        var newUser = req.body;
        newUser.password = bcrypt.hashSync(newUser.password);
        userModel
            .createUser(newUser)
            .then(function (user) {
                req.login(user, function (err) {
                    if(!err){
                        console.log(req);
                        res.json(user);
                    }
                    else {
                        res.status(400).send(err);
                    }
                })

            })
            .catch(function (error) {
                res.status(400).send();
            });
    }

    function isLoggedIn(req, res) {
        if(req.isAuthenticated()) {
            res.json(req.user);
        } else {
            res.send('0');
        }
    }

    function createUser(req, res) {
        var newUser = req.body;
        userModel
            .createUser(newUser)
            .then(function (user) {
                req.login(user, function (err) {
                    if(!err){
                        console.log(req);
                        res.json(user);
                    }
                })

            })
            .catch(function (error) {
                res.status(400).send();
            });
    }

    function findUserById(req, res) {
        var uid = req.params.userId;
        //console.log(req.session);
        userModel
            .findUserById(uid)
            .then(function (user) {
                res.send(user);
            })
            .catch(function (error) {
                res.statusCode(404).send(err);
            })
    }

    function findUser(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if (username && password) {
            findUserByCredentials(username, password, req, res);
        } else if (username) {
            findUserByUsername(username, res);
        } else {
            res.status(400).send();
        }
    }

    function findUserByCredentials(username, password, req, res) {
        console.log(req.session);
        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                req.session.user = user;
                res.send(user);
            })
            .catch((function (error) {
                res.status(404).send(error);
            }))

    }

    function findUserByUsername(username, res) {
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                res.send(user);
            })
            .catch(function (error) {
                res.status(400).send(error)
            });
    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var user = req.body;
        delete user._id;
        userModel
            .updateUser(user, userId)
            .then(function (response) {
                res.send(response);
            })
            .catch(function (error) {
                res.status(400).send(error);
            })

    }

    function deleteUser(req, res) {
        var userId = req.params.userId;
        userModel
            .deleteUser(userId)
            .then(function (response) {
                res.send(response);
            })
            .catch(function (error) {
                res.status(400).send(error);
            });
    }
};