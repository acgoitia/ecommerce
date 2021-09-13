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

// Remove item from cart
cartsRouter.delete('/:productId', async (req, res, next) => {
    try {
        const { id } = req.user;
        const product_id = req.params.productId;
        // get cart_id for logged-in user
        const cartIdResp = await db.query(`SELECT id FROM public.cart WHERE user_id = ${id}`)
        const cart_id = cartIdResp.rows[0].id;
        // execute query to insert into database
        const response = await db.query(
            `DELETE FROM public.cart_items 
            WHERE (product_id, cart_id) = (${product_id}, ${cart_id})`);
        res.send('Item deleted');
    } catch (error) {
        next(error);
    }

});


// Checkout cart
cartsRouter.post('/checkout', async (req, res, next) => {
    try {
        const { id } = req.user;
        
        // get cart_id for logged-in user
        const cartIdResp = await db.query(`SELECT id FROM public.cart WHERE user_id = ${id}`)
        const cart_id = cartIdResp.rows[0].id;
        
        // extract all items (with quantity and price) from current cart
        const currentCart = await db.query(`SELECT * FROM public.cart_items WHERE cart_id = ${cart_id}`);
        const cartItemsArray = currentCart.rows;
        
        // calculate total
        const total = cartItemsArray.reduce((total, item) => {
            return total += Number(item.price);
        }, 0);
        
        // create an order for this user
        const created = await db.query(
            `INSERT INTO public.orders (user_id, created, modified, status, total)
            VALUES (${id}, (SELECT LOCALTIMESTAMP), (SELECT LOCALTIMESTAMP), 'Processing', ${total}`);
        
        // extract order_id created
        const orderIdResponse = await db.query(`SELECT id FROM public.orders WHERE user_id = ${id}`);
        const { order_id } = orderIdResponse.rows[0];

        // add all items to the order
        cartItemsArray.forEach(async (item) => {
            const {product_id, price, quantity} = item;
            const added = await db.query(
                `INSERT INTO public.order_items
                VALUES (${order_id}, ${product_id}, ${price}, ${quantity})`);
        });

        // delete all cart items for the logged-in user
        const deleteResp = await db.query(`DELETE FROM public.cart_items WHERE cart_id = ${cart_id}`);

        res.send('Order Processing');

    } catch (error) {
        next(error)
    }
});


module.exports = cartsRouter;