const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user : {
        type : String,
        required : true
    },
    likeable : {
       type : mongoose.Schema.Types.ObjectId,
       required: true,
       refPath : 'onModel'                                                                                                                       
    },
    onModel : {
      type : String,
      rquired : true,
      enum : ['Post' , 'Comments']
    }
});

const likes = mongoose.model('Like' , likeSchema);
module.exports  = likes;