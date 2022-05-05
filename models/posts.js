const mongoose = require('mongoose');

const Posts = new mongoose.Schema({
    content : {
        type : String,
        required : true
    },
    user : {
      type : mongoose.Schema.Types.ObjectId,
      ref : 'User'
    },
    // including all the ids of the comments in  this post Schema itself
    comments : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Comments'
    }]
},{
    timestamps : true
});

const Post = mongoose.model('Post' , Posts);
module.exports = Post;