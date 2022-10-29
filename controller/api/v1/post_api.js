const Post = require("../../../models/posts");
const Comment = require("../../../models/comment");

module.exports.index = async function (req, res) {
  let posts = await Post.find({})
    .sort("-createdAt")
    .populate("user", "username email avatar") // populating the user
    .populate({
      path: "comments", // populating the comments
      populate: {
        path: "user",
      },
    });

  return res.json(200, {
    message: "List of posts",
    posts: posts,
  });
};

// controller for creating post
module.exports.createPost = async function (req, res) {
  try {
    // uploading file
    Post.uploadsAvatar(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          error: "somthing went wrong",
        });
      }

      await Post.create({
        content: req.body.content,
        user: req.user._id,
        post_img: Post.post_path + "/" + req.file.filename,
      });

      // send response back to client
      res.status(201).json({
        success: true,
        message: "success",
      });
    });

   
  } catch (err) {
    res.status(201).json({
      success: true,
      message: "Profile Not updated",
    });
  }
};

module.exports.destroy = async function (req, res) {
  const ID = req.params.id;
  try {
    let post = await Post.findById(ID);

    if (post.user == req.user.id) {
      // remove post
      post.remove();
      // Deleting comments that associated with it
      await Comment.deleteMany({ post: ID });
      // sending back response to the client

      return res.json(200, {
        message: "Post and associated comments deleted successfully",
      });
    } else {
      return res.json(401, { message: "Unauthorized Access!" });
    }
  } catch (error) {
    return res.json(500, { message: "Internal Server Error!" });
  }
};
