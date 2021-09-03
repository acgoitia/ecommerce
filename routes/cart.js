const express = require('express');
const cartsRouter = express.Router();
const db = require('../db');

// Create new cart
cartsRouter.post('/',);

// Retrieve data from existing cart
cartsRouter.get('/:id',);

// Modify existing cart
cartsRouter.put('/:id',);

// Delete existing cart
cartsRouter.delete('/:id',);

module.exports = cartsRouter;