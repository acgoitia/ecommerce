const express = require('express');
const productsRouter = express.Router();
const db = require('../db');


const validateProduct = async (req, res, next) => {
    try {
      const productId = req.params.id;
      const product = await db.query(`SELECT * FROM public.products WHERE id = $1`, [productId]);
        if(!product.rows[0]){
          const err = new Error('Product not found');
            err.status = 400;
            return next(err);
        }
        req.product = product
        next();
    } catch (error) {
      console.log(error);
      res.send(error)
    }
  };

// Retrieve data from existing product
productsRouter.get('/:id', validateProduct, async (req, res, next) => {
    res.send(req.product.rows[0]);
});


// Retrieve all products in a specific category
productsRouter.get('/', async (req, res, next) => {
    const categoryId = req.query.category;
    const action = `SELECT * FROM public.products WHERE categoryid = $1`;
    const params = [categoryId];
    const products = await db.query(action, params);
    res.send(products.rowsC);
});


// Error handler here:
productsRouter.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).send(err.message)
    console.log(err.message)
  })
  

module.exports = productsRouter;
