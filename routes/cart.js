const express = require('express');
const cartsRouter = express.Router();
const db = require('../db');

// view cart
cartsRouter.get('/', async (req, res, next) => {
    try {
        const { id } = req.user;
        const response = await db.query(
            `SELECT product_id, price, quantity 
            FROM public.cart_items
            JOIN public.cart ON public.cart_items.cart_id = public.cart.id
            WHERE public.cart.user_id = ${id}`);
        res.send(response.rows);
    } catch (error) {
        next(error);
    }

});

// Add new item to cart
cartsRouter.post('/', async (req, res, next) => {
    try {
        const { id } = req.user;
        const { product_id, quantity} = req.body;
        // get cart_id for logged-in user
        const cartIdResp = await db.query(`SELECT id FROM public.cart WHERE user_id = ${id}`)
        const cart_id = cartIdResp.rows[0].id;
        // get price of added product from products table
        const prodResponse = await db.query(`SELECT * FROM public.products WHERE id = ${product_id}`);
        const { price } = prodResponse.rows[0];
        // execute query to insert into database
        const response = await db.query(
            `INSERT INTO public.cart_items (cart_id, product_id, price, quantity)
            VALUES (${cart_id}, ${product_id}, ${price}, ${quantity})`);
        res.send('Item added to cart');
    } catch (error) {
        next(error);
    }

});

// Update item in cart (quantity)
cartsRouter.put('/:productId', async (req, res, next) => {
    try {
        const { id } = req.user;
        const product_id = req.params.productId;
        const { quantity } = req.body;
        // get cart_id for logged-in user
        const cartIdResp = await db.query(`SELECT id FROM public.cart WHERE user_id = ${id}`)
        const cart_id = cartIdResp.rows[0].id;
        // execute query to insert into database
        const response = await db.query(
            `UPDATE public.cart_items 
            SET quantity = ${quantity}
            WHERE (product_id, cart_id) = (${product_id}, ${cart_id})`);
        res.send('Item updated');
    } catch (error) {
        next(error);
    }

});

module.exports = cartsRouter;