// NEED TO ADD SWAGGER DOCUMENTATION!

const dotenv = require('dotenv')
dotenv.config();

const express = require('express');
const app = express();
const PORT =  process.env.PORT || 4001;

//add swagger documentation
const swaggerLoader = require('./swagger');
swaggerLoader(app);


const session = require('express-session');

// Use static server to serve the Express Website
app.use(express.static('public'));
app.use(express.json());  // makes req.body json object
app.use(session({ 
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: false  
  }));
app.use(express.urlencoded({ extended: false }));

// Initialize passport
const initializePassport =  require('./passport-config')
const passport = initializePassport(app);

// Import and mount Routers
const loadRouters = require('./routes');
loadRouters(app, passport);

// listen on PORT
app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});

module.exports = app;


