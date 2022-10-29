const User = require("../../../models/users");
const jwt = require("jsonwebtoken");

// controller for loggging in and create session
module.exports.createSession = async function (req, res) {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user || user.password !== req.body.password) {
      return res.json(422, {
        error: "Invalid username/password",
      });
    }

    return res.json(200, {
      message: "Sing in successfull , here is your token , keep it secret",
      data: {
        token: jwt.sign(user.toJSON(), "gosocial", { expiresIn: "1hr" }),
        user : user
      },
    });
  } catch (err) {
    return res.json(500, { error: "Internal server error" });
  } 
};

// controller for creating new user
module.exports.createUser = async function (req, res) {
  const {email , password , conform_password} = req.body;
  try {
    // check if email already be exist
    let user = await User.findOne({
      email: email,
    });

    // check password and conform password both must be equal
    if (password !== conform_password) {
      return res.status(400).json({
        success: false,
        error: "Both password does not match",
      });
    }

    // if user email already exists
    if (user) {
     return res.status(400).json({
        success: false,
        error: "Email already exists",
      });
    } else {
      // create new  user
      await User.create(req.body);
      return res.status(201).json({
        success: true,
        message: "Successfully Registered",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
        error: "Somthing went wrong" 
    })
  }
};


// getprofile controller 
module.exports.update_Profile = async function(req,res) {
    const USER_ID = req.params.userId;
    try {
         let user = await User.findById(USER_ID);

        // uploading file
         User.uploadsAvatar(req,res, async (err) => {
           if(err) {
            return res.status(400).json({
              error : 'somthing went wrong'
            });
           }

          //  update user feilds
          if(req.body.email) {
            user.email = req.body.email;
          }
          if(req.body.password) {
            user.password = req.body.password;
          }
          if(req.file) {
            user.avatar = User.avatar_path + '/' + req.file.filename;
          }

          // save user 
          await user.save();
          
          // send response
         return res.status(201).json({
            success : true,
            message : 'Profile Updated Successfully'
          });
       });
    } catch (error) {
      return res.status(500).json({
        error : 'Internal server error'
      });
    }
}