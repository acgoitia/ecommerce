const express = require('express');
const usersRouter = express.Router();
const db = require('../db');



// Retrieve data from existing user
usersRouter.get('/:id',);

// Modify existing user
usersRouter.put('/:id',);

// Delete existing user
usersRouter.delete('/:id',);


// Error handler here:
usersRouter.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).send(err.message)
  console.log(err.message)
})


module.exports = usersRouter;
