const express = require('express');
const cartsRouter = express.Router();
const db = require('../db');

// get current cartId
const currentCartId = async (req, res, next) => {
    const idResponse = await db.query('SELECT MAX(cartId) FROM public.cart_product');
    const current_id = idResponse.rows[0].max;
    let new_id;
    if (current_id) {
      req.new_id = current_id + 1;
    } else {
      req.new_id = 1; 
    }
    next();
}


// Create new cart
cartsRouter.post('/', currentCartId, async(req, res, next) => {

});

// Retrieve data from existing cart
cartsRouter.get('/:id',);

// Modify existing cart
cartsRouter.put('/:id',);

// Delete existing cart
cartsRouter.delete('/:id',);

module.exports = cartsRouter;