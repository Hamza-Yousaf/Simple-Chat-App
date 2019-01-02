var express = require('express');
var socket = require('socket.io');
var app = express();

var server = app.listen(8000,function(){
    console.log("This server is listenting on the port 8000");
});

app.use(express.static('public'));

//make connection with server
var io = socket(server);
io.on('connection',function(socket){
    socket.on("chat",function(data){
        //emit data to all client to this server
        //sockets refer to all of them whose connect socket
        io.sockets.emit("chat",data);
    });
    socket.on("typing",function(data){
        //broadcast msg send every socket expect the original one whose send a msg.
        //no see my window show another client window
        socket.broadcast.emit("typing",data);
    })
});
