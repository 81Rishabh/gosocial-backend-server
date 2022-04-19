const mongoose = require('mongoose');
const { on } = require('nodemon');
const db = mongoose.connection;
mongoose.connect('mongodb://localhost:27017/users', {useNewUrlParser: true, useUnifiedTopology: true});

db.on('error' , function(err) {
   console.bind.error(console, "Error in conneting to mongodb");
});

db.once('open' , function() {
  console.log('Connected to mongodb.......✌️ ✌️ ✌️');
});