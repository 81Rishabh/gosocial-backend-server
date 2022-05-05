const Post = require("../models/posts");
const Comment = require("../models/comment");

module.exports.createPost = async function (req, res) {
  try {
    let post = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });

  //  send  back data to client
    if(req.xhr) {
      return res.status(200).json({
         data : {
           post : post
         },
         message : "Post created"
      });
    }

    req.flash('success', 'Post Published');
    return res.redirect("back");
  } catch (err) {
    if (err) {
      console.log("error in creating post", err);
      return res.redirect("back");
    }
  }
};

module.exports.destroy = async function (req, res) {
  const ID = req.params.id;
  try {
    let post = await Post.findById(ID);
    if (post.user == req.user.id) {
        // remove post
        post.remove();
          
       
        req.flash('success', 'Post Deleted Successfully');
        // Deleting comments that associated with it
        await Comment.deleteMany({ post: ID });
         // sending back response to the client
         if(req.xhr) {
          return res.status(200).json({
            post_id : ID,
            message : 'Successfully Deleted'
          });
        }
        
        return res.redirect("back"); 
    } 
    else {
        return res.redirect("back");
    }
  } catch (error) {
    console.log("Error", error);
    return;
  }
};
