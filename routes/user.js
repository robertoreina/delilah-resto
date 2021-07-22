const express = require('express');
const UserController = require('../controllers/User');
const FavoriteController = require('../controllers/Favorite');
const OrderController = require('../controllers/Order');
const {verifyUser} = require('../middlewares/verifyUser');
const ensureAuth = require('../middlewares/authenticated');
const adminValidation = require('../middlewares/adminValidation');
const userValidation = require('../middlewares/userValidation');

const api = express.Router();

// create user
api.post('/user', verifyUser, UserController.post);

// get all user
api.get('/user', ensureAuth, adminValidation, UserController.getAll);

// get user by id
api.get('/user/:user_id', ensureAuth, userValidation, UserController.getById);

// delete user
api.delete('/user/:user_id', ensureAuth, adminValidation, UserController.delete);

// update user
api.put('/user/:user_id', ensureAuth, verifyUser, userValidation, UserController.update);

// get favorite by userId
api.get('/user/:user_id/favorite', ensureAuth, userValidation, FavoriteController.getByUserId);

// delete favorite by userId
api.delete('/user/:user_id/favorite/:favorite_id', ensureAuth, userValidation, FavoriteController.deleteByUserId);

// get order by userId
api.get('/user/:user_id/order', ensureAuth, userValidation, OrderController.getByUserId);


module.exports = api;