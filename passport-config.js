const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('./db');


const initializePassport = (app) => {
  // Initialize passport
  app.use(passport.initialize());
  app.use(passport.session());

  // Set method to serialize data to store in cookie
  passport.serializeUser(function(user, done) {
      done(null, user.id);
    });

  // Set method to deserialize data stored in cookie and attach to req.user
  passport.deserializeUser(function(id, done) {
        done(null, {id});
    });


  async function authenticateUser (email, password, done) {
    try{  
      const user = await getUserByEmail(email);
      if (!user) {
        return done(null, false, { message: 'Email not registered'});
      }

      if (user.password !== password) {
        return done(null, false, {message: 'Incorrect Password'});
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  };

  // get by email -- consolidate this code with code in register.js into single function
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

  // Configure local strategy to be use for local login
  passport.use(new LocalStrategy({usernameField: 'email'}, authenticateUser));

  return passport;
}

module.exports = initializePassport;