var express=require('express');
var app=express();
var server=require('http').Server(app);
var io=require('socket.io').listen(server);

var serialport = require('serialport');

io.on('connection',function(socket){
     console.log("Alguien se conecto");
});

var myPort = new serialport("COM4",{
    baudRate: 9600
});
  

myPort.on('open',(err) => {
if(err){
      return console.log('Error opening port: ', err.message);
    }
console.log('Arduino Conectado!.');
});

myPort.on('data',function(data){
  io.sockets.emit('lectura',data.toString('utf8'));
});


app.get('/',function(req,res){
	res.sendFile(__dirname+'/index.html');
})

server.listen(8000,function(){
	console.log("El servidor arranco");
});


