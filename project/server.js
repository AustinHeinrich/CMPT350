/*
 * Austin Heinrich
 * awh055
 * 11177796
 *
 * A program utilizing the Google Maps API - displays restaraunts but only when they are open
 * 
 */

const express = require("express");
const path = require('path');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');


const app = express(); // initalize app
const port = 7777;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  secret: 'cmpt-350-project',
  cookie: {
    maxAge: 60000
  },
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname));


/* GET main page, run server */
app.get("/", (request, response) => response.sendFile(path.resolve(__dirname + "/map.html")));
app.get("/register-page", (request, response) => response.sendFile(path.resolve(__dirname + "/register-page.html")));
app.listen(port, () => console.log(`App listening on port ${port}.`));