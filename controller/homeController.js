const Post = require('../models/posts');

module.exports.home = async function(req , res) {
     try {
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')             // populating the user
        .populate({
            path : 'comments',       // populating the comments
            populate : {
                path : 'user'
            },
            populate : {
                path : 'likes'
            }
        }).populate('likes');

        return res.render('home' , {
          posts : posts
        });
        
     } catch (err) {
         if(err) {
             console.log('Error' , err);
             return;
         }
     }
}

