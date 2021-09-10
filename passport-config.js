const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('./db');
const createError = require('http-errors');

module.exports = async(app) => {
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

//module.exports = initializePassport;




// const initializePassport = (app) => {
//   // Initialize passport
//   app.use(passport.initialize());
//   app.use(passport.session());

//   // Set method to serialize data to store in cookie
//   passport.serializeUser(function(user, done) {
//       done(null, user.id);
//     });

//   // Set method to deserialize data stored in cookie and attach to req.user
//   passport.deserializeUser(function(id, done) {
//         done(null, {id});
//     });


//   async function authenticateUser (email, password, done) {
//     try{  
//       const user = await getUserByEmail(email);
//       if (!user) {
//         return done(null, false, { message: 'Email not registered'});
//       }

//       if (user.password !== password) {
//         return done(null, false, {message: 'Incorrect Password'});
//       }
//       return done(null, user);
//     } catch (err) {
//       return done(err);
//     }
//   };

//   // get by email -- consolidate this code with code in register.js into single function
//   async function getUserByEmail(email) {
//     try {
//       const emailResponse = await db.query('SELECT * FROM public.user WHERE email = $1', [email]);
      
//       if (emailResponse.rows[0]) {
//         return emailResponse.rows[0];
//       } else {
//         return null;
//       }
//     } catch (err) {
//       throw new Error(err);
//     }
//   }

//   // Configure local strategy to be use for local login
//   passport.use(new LocalStrategy({usernameField: 'email'}, authenticateUser));

//   return passport;
// }

// module.exports = initializePassport;