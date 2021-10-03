// NEED TO ADD SWAGGER DOCUMENTATION!

const dotenv = require('dotenv')
dotenv.config();

const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
// for serving react static files
const path = require('path');

const PORT =  process.env.PORT || 4001;
// process.env.NODE_ENV => production or undefined

//add swagger documentation
const swaggerLoader = require('./swagger');
swaggerLoader(app);


const session = require('express-session');

// Use static server to serve the Express Website
app.use(express.json());  // makes req.body json object
app.use(cors({
  credentials: true,
  origin: '*' // will need to abstract it later, required for credentialss:include
}));
app.use(session({ 
  secret: process.env.SECRET_SESSION,
  resave: false,
  saveUninitialized: false  
}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.SECRET_SESSION));  // testing

if (process.env.NODE_ENV === "production"){
  // serve static content
  app.use(express.static(path.join(__dirname, 'client/build')));
} 
//app.use(express.static(path.join(__dirname, 'client/build')));

// Initialize passport
const initializePassport =  require('./passport-config')
const passport = initializePassport(app);

// Import and mount Routers
const loadRouters = require('./routes');
loadRouters(app, passport);

// catchall method
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
})

// listen on PORT
app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});

module.exports = app;


