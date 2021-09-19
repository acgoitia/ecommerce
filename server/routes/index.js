

module.exports = (app, passport) => {
    const usersRouter = require('./users');
    const productsRouter = require('./product');
    const ordersRouter = require('./order');
    const cartsRouter = require('./cart');
    const registerRouter = require('./register');
    const loginRouter = require('./login');
    
    loginRouter(app, passport);
    app.use('/register', registerRouter);
    app.use('/users', usersRouter);
    app.use('/products', productsRouter);
    app.use('/users/myprofile/cart', cartsRouter);  // only view if logged-in
    app.use('/users/myprofile/orders', ordersRouter);  // only view if logged-in
}