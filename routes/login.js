const express = require('express');
const loginRouter = express.Router();
const db = require('../db');

module.exports = (passport) => {
  // login
  loginRouter.post('/', passport.authenticate('local'), async (req, res, next) => {
      try {
        const {email, password} = req.body;
        const response = await db.query(`SELECT * FROM public.user WHERE email =$1`, [email]);
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
  
    // Error handler here:
  loginRouter.use((err, req, res, next) => {
      const status = err.status || 500;
      res.status(status).send(err.message)
      console.log(err.message)
    })
};