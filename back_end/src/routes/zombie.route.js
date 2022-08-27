const express = require('express');
const { zombieApocalypse
} = require('../controllers/zombie.controller');

const zombieRouter = express.Router();
zombieRouter.post('', zombieApocalypse);

module.exports = zombieRouter;