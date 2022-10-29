const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const port  = 8080;
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, './.env') });
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const passportJWT = require('./config/passport-jwt');
const passportLocal = require('./config/passport-local');
const googleAuthStrategy = require('./config/passport-google-oAuth');
const MongoStore = require('connect-mongo');
const expressLayouts = require('express-ejs-layouts');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const flashMidileare = require('./config/midileware');
require('./config/db');

app.use(cors());

// chat server initialization
const { createServer } = require("http");
const httpServer = createServer(app);
const ChatSocket = require('./config/chat_sockets').chat_sockets(httpServer);
httpServer.listen(4200);
console.log("chat server is listening on 5000");



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
app.use(express.json());

// cookie parser
app.use(cookieParser());


// static files
app.use(express.static('./assets'));

// make the uploads folder to static 
app.use('/uploads' , express.static(__dirname + '/uploads'));

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


app.listen(process.env.PORT || port , function(err){
    if(err) {
        console.log(`Error is : ${err}`);
        return;
    }
    console.log("Server is running on the port " + process.env.PORT || port);
});