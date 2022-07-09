const express = require(`express`);
const app = express();


const  bodyParser = require('body-parser')
const path = require('path')
app.use(express.json());
app.use(bodyParser.json());

// EXPRESS SESSION
const session = require('express-session');
app.use(session({
    secret : 'Shopaholic',
    resave : true,
    saveUninitialized : true
}));

//PASSPORT and FLASH
const flash = require('connect-flash');
const passport = require("passport");
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req,res,next)=> {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error  = req.flash('error');
    next();
    })



// PATH
app.use(express.static('public'));
app.use(express.static(__dirname));


// FILE UPLOAD
const fileUpload = require('express-fileupload');

const {
    envPort, secret 
} = require ('./config'); 


//HBS
const hbs = require('hbs');
// app.engine("hbs", exphbs({extname: "hbs"}));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + `/views/partials`);


app.use(express.urlencoded ({extended:true}));
app.use('/', express.static(path.join(__dirname,'public')))  


// SESSION MANAGEMENT?
const cookieParser = require("cookie-parser");
app.use(cookieParser()); 
const sessions = require('express-session');
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(sessions({
    secret: "Shopaholic",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));


// MONGODB
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://donnielle-andres:Shopaholic@apdev-shopaholic.74w8n.mongodb.net/?retryWrites=true&w=majority').then(
        () => console.log("Shopaholic Database Connected")
    ).catch(
        (error) => {
            console.log(error) }
    );


// ROUTES
const routes = require('./routes/route.js');
app.use('/', routes);  


//MODELS
const Product = require('./model/Product');
const Review = require('./model/Review'); 
const User = require('./model/User');

const port = envPort || 3000;

var server = app.listen(port, () => {
    console.log('Node server is running...' + port)
});
 
