const Like = require('../models/likes');
const Post = require('../models/posts');
const Comment = require('../models/comment');

module.exports.toggleLike  = async function (req , res) {
   try {
        let likeable;
        let deleted = false;

        if(req.query.type === 'Post') {
            likeable = await Post.findById(req.query.id).populate('likes');
        } 
        else {
            likeable = await Comment.findById(req.query.id).populate('likes');
        }

        // check if like is already existes
        let existingLikes = await Like.findOne({ 
            likeable : req.query.id,
            onModel  : req.query.type,
            user : req.user.id
        });
        
        if(existingLikes) {
            likeable.likes.pull(existingLikes._id);
            likeable.save();
            
            existingLikes.remove();
            deleted = true;
        }
        else {
            let newLike = await Like.create({
                likeable : req.query.id,
                user : req.user.id,
                onModel : req.query.type
            });

            likeable.likes.push(newLike._id);
            likeable.save();
            
         }

         return res.status(200).json({
             message : 'Request successful',
             data : {deleted}
         });
        
   } catch (error) {
       return res.status(500).json({message : 'Internal Server Error' , err : error});
   }
}