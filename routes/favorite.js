const express = require('express');
const FavoriteController = require('../controllers/Favorite')
const ensureAuth = require('../middlewares/authenticated')
const adminValidation = require('../middlewares/adminValidation')

const api = express.Router();

// user post
api.post('/favorite', ensureAuth, FavoriteController.post);

// get all user
api.get('/favorite', ensureAuth, adminValidation, FavoriteController.getAll);

module.exports = api;