const { DataTypes } = require('sequelize');
const connection = require('../connection');
const orderModels = require('./order');
const productModels = require('./product');

const model = connection.define(
    'orders_has_products',
    {
        order_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        product_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        quantity: {
            type: DataTypes.INTEGER
        },
        price: {
            type: DataTypes.DOUBLE
        },
        comments: {
            type: DataTypes.STRING
        }
    },
    { timestamps: false }
);

// model.belongsTo(orderModels, { as: 'orders', foreignKey: 'order_id' });
model.belongsTo(productModels, { as: 'products', foreignKey: 'product_id' });
module.exports = model;
