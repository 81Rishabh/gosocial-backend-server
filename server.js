const express = require('express');
const port  = 8000;
const path = require('path');
const app = express();
const db = require('./config/db');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local');
const passportJWT = require('./config/passport-jwt');
const MongoStore = require('connect-mongo');
const expressLayouts = require('express-ejs-layouts');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const flashMidileare = require('./config/midileware');

// scss midileware
app.use(sassMiddleware({
    /* Options */
    src: './assets/scss'
  , dest: './assets/css'
  , debug : true
  , outputStyle: 'extended'
  , prefix:  '/css'  // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
}));

// body parserer
app.use(express.urlencoded({extended : false}));

// cookie parser
app.use(cookieParser());


// static files
app.use(express.static('./assets'));

// ejs layout
app.use(expressLayouts);
// view engine
app.set('layout' , './layouts/Layout');
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
    },
    store :  MongoStore.create({
        mongoUrl : 'mongodb://localhost:27017/users-session', 
        autoRemove : 'disabled'
    })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// flash midilware
app.use(flash());
app.use(flashMidileare.setflash);

// use express router
app.use('/' , require('./routes/index'));

app.listen(port , function(err){
    if(err) {
        console.log(`Error is : ${err}`);
        return;
    }

    console.log("Server is running on the port " + port);
});