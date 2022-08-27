const express = require('express');
const zombieRouter = require('./zombie.route');

const mainRouter = express.Router();
mainRouter.use('/zombie', zombieRouter);

module.exports = mainRouter;
