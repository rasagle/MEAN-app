var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

//http and socket
var http = require('http').Server(app);
var io = require('socket.io')(http);

//connecting to the mongo database
var mongoose = require('mongoose');
var configDB = require('./server/config/database');
mongoose.connect(configDB.url);

//setting the port
var port = process.env.PORT || 3000;

//requiring the routes
var api = require('./server/routes/api');

//setting view engine
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'client', 'views'));

//setting static files
app.use(express.static(path.resolve(__dirname, 'client')));

var users = [];
io.on('connection', function(socket){
	var username = '';
	console.log('A user has Connected!');

	socket.on('request-users', function(){
		//only emits to the client requesting
		socket.emit('users', {users: users});
	});

	socket.on('message', function(data){
		//emits to everyone
		io.emit('message', {username: username, message: data.message})
	});

	socket.on('add-user', function(data){
		if(users.indexOf(data.username) == -1){
			io.emit('add-user', {username: data.username});
			username = data.username;
			users.push(data.username);
		}else{
			socket.emit('prompt-username', {message: 'User already exists'});
		}
	});

	socket.on('disconnect', function(){
		console.log(username + ' has disconnected');
		users.splice(users.indexOf(username), 1);
		io.emit('remove-user', {username: username});
	});
});

//body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride());

//using the routes
app.use('/api', api);


app.get('/', function(req, res){
	res.render('index.ejs');
});

app.all('/*', function(req, res){
	res.render('index.ejs');
});

http.listen(port, function(){
	console.log("Listening on port " + port);
});