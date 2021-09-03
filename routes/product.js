const express = require('express');
const productsRouter = express.Router();
const db = require('../db');

// Create new product
productsRouter.post('/',);

// Retrieve data from existing product
productsRouter.get('/:id',);

// Modify existing product
productsRouter.put('/:id',);

// Delete existing product
productsRouter.delete('/:id',);

module.exports = productsRouter;
