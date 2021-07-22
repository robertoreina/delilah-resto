const {DataTypes} = require('sequelize');
const connection = require('../connection');

const model = connection.define(
    'paytypes',
    {  
        description: {
            type: DataTypes.STRING
        }
    },
    {timestamps: false}  
);

module.exports = model;