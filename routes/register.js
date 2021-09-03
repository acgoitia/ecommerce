const express = require('express');
const registerRouter = express.Router();
const db = require('../db');

// Create new user
registerRouter.post('/', async (req, res, next) => {
    try {
      const {first_name, last_name, email, password} = req.body;
      
      // generate new id
      const idResponse = await db.query('SELECT MAX(id) FROM public.user');
      const current_id = idResponse.rows[0].max;
      let new_id;
      if (current_id) {
        new_id = current_id + 1;
      } else {
        new_id = 1; 
      }
      
      // check that email is not registered
      const emailResponse = await db.query('SELECT * FROM public.user WHERE email = $1', [email]);
      var hasEmail;
      if (emailResponse.rows[0]) {
        hasEmail = emailResponse.rows[0].email;
      }
      if (hasEmail) {
        //return res.status(404).send('email already registered')  // double-check how to move to error handler ** TO DO **
        const err = new Error('email already registered');
        err.status = 400;
        return next(err);
      } 
  
      // log date
      const dateResponse = await db.query('SELECT LOCALTIMESTAMP');
      const timestamp = dateResponse.rows[0].localtimestamp;
  
      // INSERT into database
      const action = `INSERT INTO public.user (id, first_name, last_name, email, password, created, modified) VALUES (
         $1, $2, $3, $4, $5, $6, $7)`;
      const params = [new_id, first_name, last_name, email, password, timestamp, timestamp];
      const newUser = await db.query(action, params);
  
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

