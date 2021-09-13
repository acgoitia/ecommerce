const express = require('express');
const usersRouter = express.Router();
const db = require('../db');


// View user profile for authenticated user
usersRouter.get('/myprofile', async (req, res, next) => {
  try {
    const { id } = req.user;
    const response = await db.query(`SELECT * FROM public.user WHERE id = $1`, [id]);
    const user = response.rows[0];
    res.send(user);
  } catch (err) {
    next(err);
  }
});


// Update user profile for authenticated user
usersRouter.put('/myprofile', async (req, res, next) => {
  try {
    const { id } = req.user;
    const { first_name, last_name, email, password } = req.body;
    

    // dynamically define which columns to update based on the BODY data
    let statement = "";
    if(first_name){
      statement += `first_name = '${first_name}'`;
    }

    if(last_name){
      if(statement){
        statement += ", ";
      }
      statement += `last_name = '${last_name}'`;
    }

    if(email){
      
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

      // if email not currently in database:
      if(statement){
        statement += ", ";
      }
      statement += `email = '${email}'`;
    }

    if(password){
      if(statement){
        statement += ", ";
      }
      statement += `password = '${password}'`;
    }

    // log date
    statement += `, modified = (SELECT LOCALTIMESTAMP)`;

    // update database
    const response = await db.query(`UPDATE public.user SET ${statement} WHERE id = ${id}`)


    res.send('user updated');
  } catch (err) {
    next(err);
  }
});


// Error handler here:
usersRouter.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).send(err.message)
  console.log(err.message)
})


module.exports = usersRouter;

