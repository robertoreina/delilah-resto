const productModels = require('../models/product');

class Product {

    // get all product
    static async getAll(req, res) {

        try {
            const products = await productModels.findAll();

            return res.status(200).json({
                status: 200,
                data: products,
                control: {
                    total_count: products.length
                }
            });

        } catch (error) {
            return res.status(500).json({
                status: 500,
                error
            })
        }
    };

    // get product by id
    static async getById(req, res) {

        try {
            const product = await productModels.findOne(
                {
                    where: {id: req.params.id}
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

    // Insert new product
    static async post(req, res) {
        const { description, price, quantity_available } = req.body;

        try {
            const product = await productModels.create({
                description,
                price,
                quantity_available
            });

            // console.log(albums instanceof albumsModel); // true
            // console.log(`id: ${userCreated.id}`); //
            return res.status(201).json({
                status: 201,
                message: 'product created',
                data: { product_id: product.id }
            });

        } catch (error) {
 
            return res.status(500).json({
                status: 500,
                error: error.message
            })
        }
    };

    // delete product
    static async delete(req, res) {

        try {
            const product = await productModels.destroy({
                where: {
                    id: req.params.id
                }
            });

            if (!product) {
                return res.status(404).json({
                    status: 404,
                    message: 'product not found'
                });
            }

            return res.status(202).json({
                status: 202,
                message: 'product removed'
            });

        } catch (error) {
            return res.status(500).json({
                status: 500,
                error: error.message
            })
        }
    };

    // update product
    static async update(req, res) {
        const { description, price, quantity_available} = req.body;

        try {
            const product = await productModels.update({
                description,
                price,
                quantity_available
            },
                {
                    where: { id: req.params.id }
                });

            if (!product) {
                return res.status(404).json({
                    status: 404,
                    message: 'product not found'
                });
            }

            return res.status(202).json({
                status: 202,
                message: 'product update'
            });

        } catch (error) {

            return res.status(500).json({
                status: 500,
                error: error.message
            })
        }
    };

}

module.exports = Product;
