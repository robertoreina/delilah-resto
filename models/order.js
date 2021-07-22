const {DataTypes} = require('sequelize');
const connection = require('../connection');
const userModels = require('./user');
const payTypeModels = require('./payType');
const statusOrderModels = require('./statusOrder');
const orders_has_productsModels = require('./orders_has_products');


const model = connection.define(
    'orders',
    {  
        status_id: {
            type: DataTypes.INTEGER
        },
        user_id: {
            type: DataTypes.INTEGER
        },
        date_time:{
            type: DataTypes.DATE
        },
        total_amount:{
            type: DataTypes.DOUBLE
        },
        pay_type_id:{
            type: DataTypes.INTEGER
        }
    },
    {timestamps: false}  
);

model.belongsTo(userModels, {as: 'user', foreignKey: 'user_id'});
model.belongsTo(statusOrderModels, {as: 'StatusOrders', foreignKey: 'status_id'});
model.belongsTo(payTypeModels, {as: 'paytypes', foreignKey: 'pay_type_id'});
model.hasMany(orders_has_productsModels, {as: 'orders_has_products', foreignKey: 'order_id'});
module.exports = model;
