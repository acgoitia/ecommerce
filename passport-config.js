const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('./db');
const createError = require('http-errors');

module.exports = (app) => {
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
  return passport;
}
