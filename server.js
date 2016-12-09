var express = require('express');
var app = express();

var restify = require('restify');
var builder = require('botbuilder');



var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var passport = require('passport');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

app.use(cookieParser());
app.use(session({ secret: 'keyboard-cat',
    proxy: true,
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

//app.use(restify.createServer());

//require ("./test/app.js")(app);

app.set('ipaddress', (process.env.IP));
app.set('port', (process.env.PORT || 3000));
require("./assignment/app.js")(app);


var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

var connector = new builder.ChatConnector({
    appId:'067b3d55-522e-4f3e-ac6b-92d09e0f19fe',
    appPassword:'aGqMuiLDyMJL3gsDrSsLdbk'
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

bot.dialog('/', function (session) {
    session.send("Hello World");
});

app.listen(app.get('port'), app.get('ipaddress'));
console.log("server started");