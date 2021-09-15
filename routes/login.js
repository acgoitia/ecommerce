const express = require('express');
const loginRouter = express.Router();
const db = require('../db');

module.exports = (app, passport) => {
  app.use('/login', loginRouter)
  
  loginRouter.post('/',  passport.authenticate('local'), async (req, res, next) => {
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
  
};