const mongoose = require('mongoose');
const db = mongoose.connection;
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/gosocial';
mongoose.connect(url, {useNewUrlParser: true});

db.on('error' , function(err) {
   console.log("Error in conneting to mongodb");
});

db.once('open' , function() {
  console.log('Connected to mongodb.......✌️ ✌️ ✌️');
});
