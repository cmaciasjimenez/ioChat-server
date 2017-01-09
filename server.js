var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
users = [];
connections = [];

server.listen(process.env.PORT || 3000);
console.log('Server running...');

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html')
});

// Connection with Socket.IO
io.on('connection', function(socket){
	connections.push(socket);
	console.log('Connected: %s sockets connected', connections.length);

	// Disconnect
	socket.on('disconnect', function(){
		users.splice(users.indexOf(socket.username), 1);
		updateUsernames();
		connections.splice(connections.indexOf(socket), 1);
		console.log('Disconnected: %s sockets connected', connections.length);
	});

	// New User
	socket.on('new user', function(data){
		socket.username = data;
		users.push(socket.username);
		updateUsernames();
	});

	function updateUsernames(){
		io.emit('get users', users);
		console.log('Users connected: ' + users);
		// -> To iOS
		var userData = JSON.stringify(users)
		io.emit('user list', userData);
	}

	// Send Message
	socket.on('send message', function(data){
		console.log('New message "' + data + '" from user "' + socket.username + '"');
		var array = []; 

		array.push({
		    "data": data,
		    "user": socket.username
		});

		var messageData = JSON.stringify(array)

		io.emit('new browser message', {msg: data, user: socket.username});
		io.emit('new message', messageData);
	});

	// New Location
  	socket.on('send location', function (data){
  		var coordinates = data.split(',');
  		var latitude = coordinates[0];
  		var longitude = coordinates[1];
  		console.log('latitude: ' + latitude + ', longitude: ' + longitude);

  		// To browser
  		io.emit('load location', {lat: latitude, longit: longitude, user: socket.username});
  		console.log('latitude: ' + latitude + ', longitude: ' + longitude + ', user: ' + socket.username);

  		// To iOS devices
  		var position = []; 

		position.push({
		    "lat": latitude,
		    "long": longitude
		});

		var locationData = JSON.stringify(position)
  		io.emit('new location', locationData);
  });

});