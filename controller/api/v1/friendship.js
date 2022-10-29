const User = require('../../../models/users');

module.exports.createFriendship = async  function(req,res){
   const userId = req.user._id;
   try { 
      let user = await User.findById(userId);
      let friend = await User.findById(req.body.friend_ID);

      let to_friend = {to_user : req.body.friend_ID, from_user : userId}
      let from_friend = {from_user : req.body.friend_ID,to_user : userId }
       
      user.friends.push(to_friend);
      friend.friends.push(from_friend);

      // save collection
      user.save();
      friend.save();
      
      res.status(201).json({
        success : true,
        message : 'You both are friend now'
      });

   } catch (error) {
     res.status(500).json({
        success : false,
        error : error.message
     })
   }
}

// controller for  delete friendship 
module.exports.removeFriendship = async function(req, res) {
   try {
       let USER_ID = req.user._id;
       let friend_id = req.body.friend_id;
      let user = await User.findByIdAndUpdate(USER_ID , {
         $pull : {
            "friends" : {
               "to_user" : friend_id,
               "from_user" : USER_ID
            }
         }
      }); 
      
      let to_user  = await User.findByIdAndUpdate(friend_id, {
         $pull : {
            "friends" : {
               "to_user" : USER_ID,
               "from_user" : friend_id
            }
         }
      }); 
      
      // AFTER UPDATE USER COLLECTION ANS SAVE 
      user.save();
      to_user.save();
      res.status(201).json({
         success : true,
         message : 'You deleted that person to user friends lists'
      });
    } catch (error) {
      res.status(201).json({
         success : true,
         error : error.message
       });
    }
}