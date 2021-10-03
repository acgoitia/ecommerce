const express = require('express');
const ordersRouter = express.Router();
const db = require('../db');


// View all orders (for specific user)
ordersRouter.get('/', async (req, res, next) => {
    try {
        const { id } = req.user;
    
        const orders = await db.query(`SELECT * FROM public.orders WHERE user_id = ${id}`);
        res.send(orders.rows);

    } catch (error) {
        next(error)
    }
});


// Retrieve data from specific order (for logged-in user)
ordersRouter.get('/:orderid', async(req, res, next) => {
    try {
        const { id } = req.user;
        const orderId = req.params.orderid;
        const orders = await db.query(`SELECT oi.price, oi.quantity, p.name, p.description
        FROM public.order_items AS oi
        INNER JOIN public.products AS p
        ON oi.pdoruct_id = p.id
        WHERE oi.order_id = ${orderId}`);
        res.send(orders.rows);  
        
    } catch (error) {
        next(error)
    }
    
});


module.exports = ordersRouter;
