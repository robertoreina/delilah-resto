const express = require('express');
const helmet = require('helmet');

// Importamos las rutas
var user_routes = require('./routes/user'); 
var login_routes = require('./routes/login'); 
var favorite_routes = require('./routes/favorite'); 
var product_routes = require('./routes/product'); 
var order_routes = require('./routes/order'); 

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());


// Cargamos las rutas
app.use('/', user_routes);
app.use('/', login_routes);
app.use('/', favorite_routes);
app.use('/', product_routes);
app.use('/', order_routes);

module.exports = app;