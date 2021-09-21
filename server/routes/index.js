

module.exports = (app, passport) => {
    const usersRouter = require('./users');
    const productsRouter = require('./product');
    const ordersRouter = require('./order');
    const cartsRouter = require('./cart');
    const registerRouter = require('./register');
    const loginRouter = require('./login');
    
    loginRouter(app, passport);
    app.use('/api/register', registerRouter);
    app.use('/api/users', usersRouter);
    app.use('/api/products', productsRouter);
    app.use('/api/users/myprofile/cart', cartsRouter);  // only view if logged-in
    app.use('/api/users/myprofile/orders', ordersRouter);  // only view if logged-in
}