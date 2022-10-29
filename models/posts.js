const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const POST_PATH = path.join('/uploads/users/posts');
const storage = require('../helper/multer_storage'); 

const Posts = new mongoose.Schema({
    content : {
        type : String,
        required : true
    },
    user : {
      type : mongoose.Schema.Types.ObjectId,
      ref : 'User'
    },
    post_img : {
        type : String,
    },
    // including all the ids of the comments in  this post Schema itself
    comments : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Comments'
    }],
    likes : [{
        type  : mongoose.Schema.Types.ObjectId,
        ref : 'Like'
    }]
},{
    timestamps : true
});


Posts.statics.uploadsAvatar = multer({ storage: storage(POST_PATH) }).single('post_img');
Posts.statics.post_path = POST_PATH;

const Post = mongoose.model('Post' , Posts);
module.exports = Post;