//To test the current project, type in command line: node output/server.js (If working directory is sample-formdata-firestore-api)

import {app} from './configurations/app';
const http = require('http');

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port,()=>{
    console.log("Connected to port "+port);
});