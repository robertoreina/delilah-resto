const orderModels = require('../models/order');
const orders_has_productsModels = require('../models/orders_has_products');
const userModels = require('../models/user');
const productModels = require('../models/product');


class Order {

    // get all order
    static async getAll(req, res) {

        try {
            const orders = await orderModels.findAll(
                {
                    include: [
                        {
                            model: userModels,
                            as: 'user',
                            attributes:
                            {
                                exclude: ['password']
                            }
                        },
                        'StatusOrders',
                        'paytypes',
                        {
                            model: orders_has_productsModels,
                            as: 'orders_has_products',
                            include: [
                                {
                                    model: productModels,
                                    as: 'products',
                                    attributes: ['description']
                                }
                            ],
                            attributes:
                            {
                                exclude: ['order_id']
                            }
                        },
                    ],
                    attributes: {
                        exclude: ['user_id', 'status_id', 'pay_type_id']
                    }
                }
            );
            return res.status(200).json({
                status: 200,
                data: orders,
                control: {
                    total_count: orders.length
                }
            });

        } catch (error) {
            return res.status(500).json({
                status: 500,
                error: error.message
            })
        }
    };

    // get order by id
    static async getById(req, res) {

        try {
            const product = await productModels.findOne(
                {
                    where: { id: req.params.id }
                }
            );

            if (!product) {
                return res.status(404).json({
                    status: 404,
                    message: 'product not found'
                });
            }

            console.log(product)
            return res.status(200).json({
                status: 200,
                data: product,
            });

        } catch (error) {
            return res.status(500).json({
                status: 500,
                error: error.message
            })
        }
    };

    // Insert new order
    static async post(req, res) {
        const { status_id, date_time, total_amount, pay_type_id, } = req.body;
        const { user_id } = req.user;
        const { order_product } = req.body

        try {
            const order = await orderModels.create({
                status_id,
                user_id,
                date_time,
                total_amount,
                pay_type_id
            });

            const order_id = order.id;
            order_product.forEach((product, array) => {
                // const { product_id, quantity, price, comments } = product;
                product.order_id = order_id;
            });

            const orderProduct = await orders_has_productsModels.bulkCreate(order_product);

            // console.log(albums instanceof albumsModel); // true
            // console.log(`id: ${userCreated.id}`); //
            return res.status(201).json({
                status: 201,
                message: 'order created',
                data: { order_id: order.id }
            });

        } catch (error) {
            return res.status(500).json({
                status: 500,
                error: error.message
            })
        }
    };

    // update order
    static async update(req, res) {
        const { date_time, status_id, pay_type_id } = req.body;

        try {
            const order = await orderModels.update({
                date_time,
                status_id,
                pay_type_id
            },
                {
                    where: { id: req.params.id }
                });

            if (!order) {
                return res.status(404).json({
                    status: 404,
                    message: 'order not found'
                });
            }

            return res.status(202).json({
                status: 202,
                message: 'order update'
            });

        } catch (error) {

            return res.status(500).json({
                status: 500,
                error: error.message
            })
        }
    };

    // get order by userId 
    static async getByUserId(req, res) {

        try {
            const orders = await orderModels.findAll(
                {
                    where: { user_id: req.params.user_id },
                    include: [
                        {
                            model: userModels,
                            as: 'user',
                            attributes:
                            {
                                exclude: ['password', 'is_admin']
                            }
                        },
                        'StatusOrders',
                        'paytypes',
                        {
                            model: orders_has_productsModels,
                            as: 'orders_has_products',
                            include: [
                                {
                                    model: productModels,
                                    as: 'products',
                                    attributes: ['description']
                                }
                            ],
                            attributes:
                            {
                                exclude: ['order_id']
                            }
                        },
                    ],
                    attributes: {
                        exclude: ['user_id', 'status_id', 'pay_type_id']
                    }
                }
            );

            if (!orders) {
                return res.status(404).json({
                    status: 404,
                    message: 'orders not found'
                });
            }

            return res.status(200).json({
                status: 200,
                data: orders,
                control: {
                    total_count: orders.length
                }
            });

        } catch (error) {
            return res.status(500).json({
                status: 500,
                error: error.message
            })
        }
    };

    // delete order by id
    static async delete(req, res) {

        try {
            const orderProducts = await orders_has_productsModels.destroy({
                where: {
                    order_id: req.params.id
                }
            });

            const order = await orderModels.destroy({
                where: {
                    id: req.params.id
                }
            });

            if (!order) {
                return res.status(404).json({
                    status: 404,
                    message: 'order not found'
                });
            }

            return res.status(202).json({
                status: 202,
                message: 'order removed'
            });

        } catch (error) {
            return res.status(500).json({
                status: 500,
                error: error.message
            })
        }
    };
}

module.exports = Order;
