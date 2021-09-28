const express = require('express');
const logoutRouter = express.Router();

    
logoutRouter.get('/', (req, res) => {
    req.logout();
    res.send('logged out successfully');
});

module.exports = logoutRouter;