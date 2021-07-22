const {DataTypes} = require('sequelize');
const connection = require('../connection');

const model = connection.define(
    'products',
    {  
        description: {
            type: DataTypes.STRING
        },
        price:{
            type: DataTypes.DOUBLE
        },
        quantity_available: {
            type: DataTypes.INTEGER
        }
    },
    {timestamps: false}  
);

module.exports = model;