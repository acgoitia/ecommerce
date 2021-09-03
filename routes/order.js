const express = require('express');
const ordersRouter = express.Router();
const db = require('../db');

// Create new order
ordersRouter.post('/',);

// Retrieve data from existing order
ordersRouter.get('/:id',);

// Modify existing order
ordersRouter.put('/:id',);

// Delete existing order
ordersRouter.delete('/:id',);

module.exports = ordersRouter;
