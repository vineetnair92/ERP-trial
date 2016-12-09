var restify = require('restify');
var builder = require('botbuilder');

//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// Create chat bot
var connector = new builder.ChatConnector({
    appId:'067b3d55-522e-4f3e-ac6b-92d09e0f19fe',
    appPassword:'aGqMuiLDyMJL3gsDrSsLdbk'
});
var bot = new builder.UniversalBot(connector);
server.post('/API/messages', connector.listen());

//=========================================================
// Bots Dialogs
//=========================================================

bot.dialog('/', function (session) {
    session.send("Hello World");
});