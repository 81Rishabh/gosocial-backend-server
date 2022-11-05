
const mongoose = require('mongoose');
const db = mongoose.connection;
mongoose.connect(process.env.DATABASE, {useNewUrlParser: true});

db.on('error' , function(err) {
   console.log("Error in conneting to mongodb" , err);
});

db.once('open' , function() {
  console.log('Connected to mongodb.......✌️ ✌️ ✌️');
});