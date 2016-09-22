var express = require('express');
var mongoose = require('mongoose');

var bodyParser = require('body-parser');

var authController = require('./server/controllers/auth-controller')
var profileController = require('./server/controllers/profile-controller')
var postController = require('./server/controllers/post-controller');


var multiPart = require('connect-multiparty')
var app = express();

var multiPartMiddleware = new multiPart();

conn = mongoose.connect('mongodb://127.0.0.1:27017/socialnetwork');

//body parser
app.use(bodyParser.json());
app.use('/app', express.static(__dirname + "/app"));
app.use('/node_modules', express.static(__dirname + "/node_modules"));
app.use('/uploads', express.static(__dirname + "/uploads"));
app.use(multiPartMiddleware);


app.get('/', function(req,res){
	res.sendfile('index.html');
})

app.get('/test', function(req,res){
	res.sendfile('test.html');
})

//Auth
app.post('/api/user/signup', authController.signup);
app.post('/api/user/login', authController.login);

//Profile
app.post('/api/profile/updatePhoto', multiPartMiddleware, profileController.updatePhoto);
app.post('/api/profile/updateUsername', profileController.updateUsername);
app.post('/api/profile/updateBio', profileController.updateBio);

//user
app.post('/api/post/sendContent', postController.sendContent);
app.get('/api/post/get', postController.getAllPosts);


app.listen('3000', function(){
	console.log('it works at port 3000');
});
