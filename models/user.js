const {DataTypes} = require('sequelize');
const connection = require('../connection');

const model = connection.define(
    'users',
    {  
        user: {
            type: DataTypes.STRING
        },
        name:{
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        phone: {
            type: DataTypes.STRING
        },
        address: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        is_admin: {
            type: DataTypes.BOOLEAN
        }
    },
    {timestamps: false}  
);

module.exports = model;