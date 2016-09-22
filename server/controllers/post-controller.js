var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var Post = require('../datasets/posts');


module.exports.sendContent = function(req,res) {
	console.log('Posting Message');

  var post = new Post(req.body);
  post.save(function(err) {
    if(!err) {
        Post.find({}).sort({'date' : -1}).exec(function(err, allPosts) {
          if(!err) {
            res.json(allPosts);
          }
        });
    }
  });


}

module.exports.getAllPosts = function(req,res) {
	Post.find({}).sort({'date' : -1}).exec(function(err, allPosts) {
		if(!err) {
			res.json(allPosts);
		}
	});
}
