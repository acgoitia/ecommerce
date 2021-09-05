const express = require('express');
const ordersRouter = express.Router();
const db = require('../db');

// Create new order
//ordersRouter.post('/',);

// View all orders (for specific user)
ordersRouter.get('/', async (req, res, next) => {
    // need to pass session information to get userId for this call (TO DO)

    
});


// Retrieve data from existing order
ordersRouter.get('/:id', async(req, res, next) => {
    const orderId = req.params.id;
    const order = await db.query(`SELECT * FROM public.orders WHERE orderId = $1`, [orderId]);
    res.send(order.rows);  
});

// Modify existing order
//ordersRouter.put('/:id',);

// Delete existing order
//ordersRouter.delete('/:id',);




module.exports = ordersRouter;
