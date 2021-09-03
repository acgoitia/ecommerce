const express = require('express');
const usersRouter = express.Router();
const db = require('../db');


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


// Retrieve data from existing user
usersRouter.get('/:id', validateUser, (req, res, next) => {
    res.send(req.user.rows[0]);
});

// Modify existing user
usersRouter.put('/:id', validateUser, async (req, res, next) => {
  const {first_name, last_name, email, password} = req.body;
  const userId = req.params.id;
  const action = `UPDATE public.users SET first_name = $1, last_name = $2, email = $3, password = $4, modified = $5`;
  // CONTINUE HERE...
});

// Delete existing user
usersRouter.delete('/:id',);


// Error handler here:
usersRouter.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).send(err.message)
  console.log(err.message)
})


module.exports = usersRouter;



// try {
//   const userId = req.params.id;
//   const user = await db.query(`SELECT * FROM public.user WHERE id = $1`, [userId]);
//   if(!user.rows[0]){
//     const err = new Error('user not found');
//       err.status = 400;
//       return next(err)
//   }
//   res.send(user.rows[0]);

// } catch (error) {
//   console.log(error);
//   res.send(error);
// }
// });