const dotenv = require('dotenv')
dotenv.config();

const express = require('express');
const app = express();
const PORT =  process.env.PORT || 4001;

const session = require('express-session');
//var passport = require('passport');
//const initializePassport = require('./passport-config');

// Use static server to serve the Express Yourself Website
app.use(express.static('public'));
app.use(express.json());  // makes req.body json object
app.use(session({ 
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: false  
  }));
app.use(express.urlencoded({ extended: false }));

// Initialize passport *****
    //const passport = initializePassport(app); // check if i need to declare passport elsewhere
    // Import all needed 
    const passport = require('passport');
    const LocalStrategy = require('passport-local').Strategy;
    const db = require('./db');
    const createError = require('http-errors');
    //.........

    app.use(passport.initialize());
    app.use(passport.session());
  
    passport.serializeUser((user, done) => {
      done(null, user.id);
    });
  
    passport.deserializeUser((id, done) => {
      done(null, { id });
    });
  
    passport.use(new LocalStrategy(async (username, password, done) => {
      try {
        const response = await db.query(`SELECT * FROM public.user WHERE email =$1`, [username]);
        //const response = await db.query(`SELECT * FROM public.user WHERE email =$1`);
        const user = response.rows[0];
        if (!user) {
          throw createError(401, 'Incorrect username or password');
        }
        if (user.password !== password) {
          throw createError(401, 'Incorrect username or password');
        }
        return done(null, user)
      } catch (err) {
        return done(err)
      }    
      }
    ));

// **** Finished passport


// Import and mount Routers
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/product');
const ordersRouter = require('./routes/order');
const cartsRouter = require('./routes/cart');
const registerRouter = require('./routes/register');
//const loginRouter = require('./routes/login');

app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);
app.use('/carts', cartsRouter);
app.use('/register', registerRouter);
//app.use('/login', loginRouter(passport));
app.post('/login',  passport.authenticate('local'), async (req, res, next) => {
  try {
    const {username, password} = req.body;
    const response = await db.query(`SELECT * FROM public.user WHERE email =$1`, [username]);
    const user = response.rows[0];
    if (!user) {
      throw createError(401, 'Incorrect username or password');
    }
    if (user.password !== password) {
      throw createError(401, 'Incorrect username or password');
    }
    res.status(200).send(user);
  } catch (err) {
    next(err)
  }
});


// listen on PORT
app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});

module.exports = app;


