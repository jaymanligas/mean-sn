var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
	email: String,
	password: String,
	image: String,
	bio : String,
	username : String
});
