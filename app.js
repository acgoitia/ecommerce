const dotenv = require('dotenv')
dotenv.config();

const express = require('express');
const app = express();
const PORT =  process.env.PORT || 4001;

const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');
const initializePassport = require('./passport-config');

// Use static server to serve the Express Yourself Website
app.use(express.static('public'));
app.use(express.json());  // makes req.body json object

// Import and mount Routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/product');
const ordersRouter = require('./routes/order');
const cartsRouter = require('./routes/cart');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);
app.use('/carts', cartsRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);

// handle login
initializePassport(passport);
app.use(flash());
app.use(session({ 
  secret: process.env.SECRET_SESSION,
  resave: false,
  saveUninitialized: false  
}));
app.use (express.urlencoded({ extended: false }));

app.post(
  '/login', 
  passport.authenticate('local'),
  async (req, res, next) => {
  try {
    const { username, password } = req.body;
  
    const response = await login({username, password});
  
    res.status(200).send(response);
  } catch(err) {
    next(err);
  }
}
);
app.delete('/logout', (req, res) => {
  req.logout();
  req.redirect('/login');
})

// listen on PORT
app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});

module.exports = app;


// Try to copy structure of model answer
async function login(data) {

  const { email, password } = data;

  try {
    // Check if user exists
    const user = await getUserByEmail(email);

    // If no user found, reject
    if (!user) {
      throw createError(401, 'Incorrect username or password');
    }

    // Check for matching passwords
    if (user.password !== password) {
      throw createError(401, 'Incorrect username or password');
    }

    return user;

  } catch(err) {
    throw createError(500, err);
  }

};

async function getUserByEmail(email) {
  try {
    const emailResponse = await db.query('SELECT * FROM public.user WHERE email = $1', [email]);
    
    if (emailResponse.rows[0]) {
      return emailResponse.rows[0];
    } else {
      return null;
    }
  } catch (err) {
    throw new Error(err);
  }
}


