"use strict";
//To test the current project, type in command line: node output/server.js (If working directory is sample-formdata-firestore-api)
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./configurations/app");
var http = require('http');
var port = process.env.PORT || 3000;
var server = http.createServer(app_1.app);
server.listen(port, function () {
    console.log("Connected to port " + port);
});
