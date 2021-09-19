const express = require('express');
const registerRouter = express.Router();
const db = require('../db');

// Create new user
registerRouter.post('/', async (req, res, next) => {
    try {
      const {first_name, last_name, email, password} = req.body;
      
      // check that email is not registered
      const emailResponse = await db.query('SELECT * FROM public.user WHERE email = $1', [email]);
      var hasEmail;
      if (emailResponse.rows[0]) {
        hasEmail = emailResponse.rows[0].email;
      }
      if (hasEmail) {
        const err = new Error('email already registered');
        err.status = 400;
        return next(err);
      } 
  
      // log date
      const dateResponse = await db.query('SELECT LOCALTIMESTAMP');
      const timestamp = dateResponse.rows[0].localtimestamp;
  
      // INSERT into database
      const action = `INSERT INTO public.user (first_name, last_name, email, password, created, modified) VALUES (
         $1, $2, $3, $4, $5, $6)`;
      const params = [first_name, last_name, email, password, timestamp, timestamp];
      const newUser = await db.query(action, params);
  
      //
      const response = await db.query(`SELECT (id) FROM public.user WHERE email = $1`, [email]);
      const {id} = response.rows[0];
      // Generate new cart id for new user
      const newCart = await db.query(`INSERT INTO public.cart (user_id) VALUES ($1)`,[id]);

      res.send('New user created');
      
      // execute database action
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  });

  // Error handler here:
registerRouter.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).send(err.message)
    console.log(err.message)
  })
  
  
  module.exports = registerRouter;

