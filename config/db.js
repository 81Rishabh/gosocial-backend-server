const mongoose = require('mongoose');
mongoose.connect(`${process.env.MONGODB_URI}` || `${process.env.LOCAL}`, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;


db.once('open' , function() {
  console.log('Connected to mongodb.......✌️ ✌️ ✌️');
});

db.on('error' , function(err) {
  console.log("Error in conneting to mongodb");
});
