var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

users = {};

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res, next) {
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(socket) {
    console.log('client connected');
    
    socket.on('chat message', function(msg) 
    {
        io.emit('chat message', users[socket.id], msg);
    });
    
    socket.on('newUser', function(data)
	{
		io.emit('user', data);
		users[socket.id] = data;
		console.log(users);
	});
    
});
    

//start our web server and socket.io to server listening
server.listen(3000, function() {
    console.log('listening on *:3000');
})