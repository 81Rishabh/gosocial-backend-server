const Comment = require('../models/comment');
const Post = require('../models/posts');
const Like = require('../models/likes');
const commentMailer = require('../config/mailers/comments_mailer');

module.exports.create = async function (req , res) {
   try {
    const post = await Post.findById(req.body.postId);
    if(post) {
          let comment = await Comment.create({
                content: req.body.content,
                user : req.user._id,
                post : req.body.postId
            });
          //  pushing comment
          post.comments.push(comment);
          post.save();
          
          comment = await comment.populate('user');

          // sending mail to user when someone is commented on the post
          // commentMailer.newComment(comment);
          if(req.xhr) {
              return res.status(200).json({
                 data : {
                   comments : comment
                 },
                 message : "Comment Added."
              });
          }

          return res.redirect('back');
    }
   } catch (error) {
       console.log("Error" , error);
       return;
   }
}

module.exports.destroy = async function(req, res) {
   const COMMENT_ID = req.params.id;
  try {
    let comment = await Comment.findById(COMMENT_ID); 
     
  
    if(comment.user == req.user.id) {
         let postId = comment.post;
         comment.remove();
      
         //  find array in post and delete that
         await Post.findByIdAndUpdate(postId , {$pull : {comments : COMMENT_ID}});

         //  deleting all the associated likes of posts 
        await Like.deleteMany({ likable : comment._id , onModel : 'Comments'});

          //  send response  back to client about comment deleted
          if(req.xhr) {
            return res.status(200).json({
               comment_id : COMMENT_ID,
               message : "Comment Deleted."
            });
          }
         return res.redirect('back'); 
     }  
   
  } catch (error) {
    console.log("Error found" , error.message);
    return;
  }
}