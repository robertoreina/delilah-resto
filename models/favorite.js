const {DataTypes} = require('sequelize');
const connection = require('../connection');
const userModels = require('../models/user');
const productModels = require('../models/product');


const model = connection.define(
    'favorites',
    {  
        user_id: {
            type: DataTypes.INTEGER
        },
        product_id:{
            type: DataTypes.INTEGER
        }
    },
    {timestamps: false}  
);

model.belongsTo(userModels, {as: 'user', foreignKey: 'user_id'});
model.belongsTo(productModels, {as: 'product', foreignKey: 'product_id'});
module.exports = model;
