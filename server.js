const express = require('express');
const port  = 8000;
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const db = require('./config/db');

// body parserer
app.use(bodyParser.urlencoded({extended : false}));


// use express router
app.use('/' , require('./routes/index'));


// view engine
app.set('view engine', 'ejs');
app.set('views' , path.join(__dirname, 'views'));


app.listen(port , function(err){
    if(err) {
        console.log(`Error is : ${err}`);
        return;
    }

    console.log("Server is running on the port " + port);
});