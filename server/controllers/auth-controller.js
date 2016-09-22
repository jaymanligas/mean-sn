//var mongoose = require('mongoose');

var User = require('../datasets/users');

module.exports.signup = function(req,res) {
	console.log('Creating user');
	console.log(req.body);

	User.find( {'email': req.body.email}, function(err, results){



		if(err){
			console.log('error out');
			console.log(err);

		}else{

			if(results && results.length === 1){
				req.body['message']="User already exist.";
				req.body['messageType']="danger";
				res.json(req.body);
			}

			if(results && results.length === 0){
				var user = new User(req.body);
				user.save();
				req.body['message']="User created.";
				req.body['messageType']="success";
				res.json(req.body);
			}

		}
	});

}

module.exports.login = function(req, res) {
	console.log("Logging in..");
	console.log(req.body);
	User.find(req.body, function(err, results){
		if(err){
			console.log('error out');
			console.log(err);
		}
		if(results && results.length === 1){
			userData = results[0];
			res.json({ email: req.body.email, 
				_id : userData._id,
				bio : userData.bio,
				image : userData.image,
				username : userData.username
			} );
		}
	});
}
