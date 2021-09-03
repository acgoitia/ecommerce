const express = require('express');
const loginRouter = express.Router();
const db = require('../db');
const passport = require('passport');
const LocalStrategy = require('passport-local');


// login
loginRouter.post('/', async (req, res, next) => {
    try {
      
    } catch (error) {

    }
  });

  // Error handler here:
loginRouter.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).send(err.message)
    console.log(err.message)
  })
  
  
  module.exports = loginRouter;