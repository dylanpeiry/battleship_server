let express = require('express');
let app = express();
let server = require('http').createServer(app);
let io = require('socket.io').listen(server);
let battleship = require('./server')(io);

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html');
});

server.listen(4200);

module.exports = server;