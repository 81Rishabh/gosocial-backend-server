const User = require("../../../models/users");

// get all the Users
module.exports.getUsers  = async function (req, res) {
    try {
        let user = await User.find({}).select("username  email  avatar friends");
        if (user) {
          res.status(200).json({
            data: user,
          });
        } 
      } catch (error) {
        res.status(404).json({
          error: "server error",
        });
      }
}


// get perticular user by ID
module.exports.getUsersProfile = async function (req, res) {
  const ID = req.params.userId;

  try {
    let user = await User.findById(ID).select("username email avatar friends");
    if (user) {
      res.status(200).json({
        data: user,
      });
    } else {
      res.status(404).json({
        error: "User not found",
      });
    }
  } catch (error) {
    res.status(404).json({
      error: "server error",
    });
  }
};

