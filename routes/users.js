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






//.................................................
// Test - retrieve data only for authenticated user

usersRouter.get('/auth', async (req, res, next) => {
  try {
    const { id } = req.user;
    const response = await db.query(`SELECT * FROM public.user WHERE id = $1`, [id]);
    const user = response.rows[0];
    res.send(user);
  } catch (err) {
    next(err);
  }


});

//.................................................

const validateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await db.query(`SELECT * FROM public.user WHERE id = $1`, [userId]);
      if(!user.rows[0]){
        const err = new Error('user not found');
          err.status = 400;
          return next(err);
      }
      req.user = user
      next();
  } catch (error) {
    console.log(error);
    res.send(error)
  }
};


///***  test router for searching by email
usersRouter.get('/', async (req, res, next) => {
  try {
    const {email} = req.body;
    const response = await db.query(`SELECT * FROM public.user WHERE email =$1`, [email]);
    const user = response.rows[0];
    if (!user) {
      const err = new Error('user not found');
      err.status = 400;
      return next(err);
    }
    res.status(200).send(user);
  } catch (err) {
    next(err)
  }
});

//***



// Retrieve data from existing user
usersRouter.get('/:id', validateUser, (req, res, next) => {
    res.send(req.user.rows[0]);
});

// Modify existing user
usersRouter.put('/:id', validateUser, async (req, res, next) => {
  const {first_name, last_name, email, password} = req.body;
  const userId = req.params.id;
  // log date
  const dateResponse = await db.query('SELECT LOCALTIMESTAMP');
  const timestamp = dateResponse.rows[0].localtimestamp;
  //
  const action = `UPDATE public.user SET first_name = $1, last_name = $2, email = $3, password = $4, modified = $5 WHERE id=$6`;
  const params = [first_name, last_name, email, password, timestamp, userId];

  const updatedUser = await db.query(action, params);
  res.send('User updated')
});

// Delete existing user
usersRouter.delete('/:id', validateUser, async (req, res, next) => {
  const userId = req.params.id;
  const deletedUser = await db.query(`DELETE FROM public.user WHERE id = $1`, [userId]);
  res.send('User Deleted');
});


// Error handler here:
usersRouter.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).send(err.message)
  console.log(err.message)
})


module.exports = usersRouter;

