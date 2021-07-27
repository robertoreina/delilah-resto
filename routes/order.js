const express = require('express');
const OrderController = require('../controllers/Order');
const ensureAuth = require('../middlewares/authenticated');
const adminValidation = require('../middlewares/adminValidation');
const verifyOrder = require('../middlewares/verifyOrder');

const api = express.Router();

// order post
api.post('/order', ensureAuth,  verifyOrder, OrderController.post);

// order get all
api.get('/order', ensureAuth, adminValidation, OrderController.getAll);

// order update
api.put('/order/:id', ensureAuth, adminValidation, OrderController.update);

// order update
api.delete('/order/:id', ensureAuth, adminValidation, OrderController.delete);


module.exports = api;