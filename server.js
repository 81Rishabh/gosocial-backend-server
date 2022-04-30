const express = require('express');
const port  = 8000;
const path = require('path');
const app = express();
const db = require('./config/db');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local');

// body parserer
app.use(express.urlencoded({extended : false}));

// cookie parser
app.use(cookieParser());



// view engine
app.set('view engine', 'ejs');
app.set('views' , path.join(__dirname, 'views'));


// use passport Local
app.use(session({
    name : 'gosocial',
    secret : 'hbahsir',
    saveUninitialized : false,
    resave : false,
    cookie : {
        maxAge : (1000 * 60 * 100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

// use express router
app.use('/' , require('./routes/index'));

app.listen(port , function(err){
    if(err) {
        console.log(`Error is : ${err}`);
        return;
    }

    console.log("Server is running on the port " + port);
});