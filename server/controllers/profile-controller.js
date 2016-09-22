var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

var User = require('../datasets/users');
var fs = require('fs-extra');
var path = require('path');


module.exports.edit = function(req,res) {
	console.log('Edit Profile user');
	console.log(req.body);
}


module.exports.updatePhoto = function(req,res) {

	console.log(req);
	var file = req.files.file;
	var userId = req.body.userId;
	console.log("User "+ userId+" is uploading ");

	var uploadDate = new Date().toISOString();

	uploadDate = uploadDate.replace(/:/g,"");
	uploadDate = uploadDate.replace(/-/g,"");
	uploadDate = uploadDate.replace(/\./g,"");

	console.log("uploadDate" + uploadDate);

	var tempPath = file.path;

	var savePath = '/uploads/' + userId + uploadDate + file.name;
	var targetPath = path.join( __dirname, '../..' + savePath);

	console.log(tempPath);
	console.log(targetPath);

	fs.rename(tempPath, targetPath, function(err) {
		if(err) {
			console.log('rename Error');

		}else {

			// update database;

			User.findOne( { _id: ObjectId(userId) } , function(err1 , userData){

				if(err1) {
					console.log(err1);
				}

				var _user = userData;
				console.log("USER: " , _user);
				_user.image = savePath;
				_user.save(function(err) {
					if(err) {
						console.log("save failed");
					}else {
						console.log("save success");
						res.json({ image: _user.image });
					}
				})

			})
			console.log('file moved');
		}
	})


}

module.exports.updateUsername = function(req,res) {

	console.log("\n\n\n\n updateUsername ", req.body);

	var username = req.body.username;
	var userId = req.body.userId;
	console.log("username "+ username);

	User.findOne( { _id: ObjectId(userId) } , function(err1 , userData){

		userData.username = username;

		userData.save(function(err){

			if(err1) {
				console.log(err1);
				res.json({status:500})
			}else {
				console.log("OK" , userData);
				res.json({status:200})
			}
		})
	});
}

module.exports.updateBio = function(req,res) {

	console.log("\n\n\n\n updateBio ", req.body);
	var bio = req.body.bio;
	var userId = req.body.userId;
	console.log("bio: "+ bio);

	User.findOne( { _id: ObjectId(userId) } , function(err1 , userData){

		userData.bio = bio;

		userData.save(function(err){

			if(err1) {
				console.log(err1);
				res.json({status:500})
			}else {
				console.log("OK" , userData);
				res.json({status:200})
			}
		});

	});

}
