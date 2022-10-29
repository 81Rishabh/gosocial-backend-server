const mongoose = require('mongoose');
const db = mongoose.connection;
console.log(process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});

db.on('error' , function(err) {
   console.log("Error in conneting to mongodb");
});

db.once('open' , function() {
  console.log('Connected to mongodb.......✌️ ✌️ ✌️');
});