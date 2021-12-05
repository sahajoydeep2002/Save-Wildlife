const express = require('express');
const router = require('./Routes/routes');
const path = require('path');
const expressSession = require('express-session');
const MemoryStore = require('memorystore')(expressSession);
const passport = require('passport');

const app = express();

// MIDDLEWARES
// BODY-PARSER
app.use(express.urlencoded({extended : false}));
// STATIC FILES
app.use(express.static(path.join(__dirname , "public")));

// VIEWS
app.set('view engine' , 'ejs');
app.set('views' , path.join(__dirname , "views"));

// AUTHENTICATION
app.use(expressSession({
    secret : "random",
    resave : true,
    saveUninitialized : false,
    maxAge : 60*1000,
    store: new MemoryStore({
        checkPeriod: 86400000 // prune expired entries every 24h
    }),
}));

app.use(passport.initialize());
app.use(passport.session());

// ROUTES
app.use("/" , router);


app.listen(3000 , ()=>{
    console.log("server up and running");
});