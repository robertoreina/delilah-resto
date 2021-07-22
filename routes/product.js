const express = require('express');
const ProductController = require('../controllers/Product');
const ensureAuth = require('../middlewares/authenticated');
const adminValidation = require('../middlewares/adminValidation');
const verifyProduct = require('../middlewares/verifyProduct');


const api = express.Router();

// product post
api.post('/product', ensureAuth, adminValidation, verifyProduct, ProductController.post);

// get all product
api.get('/product', ensureAuth,  ProductController.getAll);

// get product by id
api.get('/product/:id', ensureAuth,  ProductController.getById);

// product update
api.put('/product/:id', ensureAuth, adminValidation, verifyProduct, ProductController.update);

// product delete
api.delete('/product/:id', ensureAuth, adminValidation, ProductController.delete);


module.exports = api;