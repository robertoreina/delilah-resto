const {DataTypes} = require('sequelize');
const connection = require('../connection');

const model = connection.define(
    'StatusOrders',
    {  
        description: {
            type: DataTypes.STRING
        }
    },
    {timestamps: false}  
);

module.exports = model;