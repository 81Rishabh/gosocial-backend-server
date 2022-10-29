const mongoose = require('mongoose');
const db = mongoose.connection;
const url = `${process.env.MONGODB_URI}` || 'mongodb://localhost:27017/gosocial';
mongoose.connect(`mongodb+srv://dbRishabh:lFF6Duc2bpBbEyPD@cluster0.lyw5b.mongodb.net/gosocial` || process.env.MONGODB_URI);

db.on('error' , function(err) {
   console.log("Error in conneting to mongodb");
});

db.once('open' , function() {
  console.log('Connected to mongodb.......✌️ ✌️ ✌️');
});
