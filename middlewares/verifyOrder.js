
function verifyOrder(req, res, next) {
    const { status_id, date_time, total_amount, pay_type_id } = req.body;
    const { order_product } = req.body

    try {
        if (!status_id) {
            return res.status(422).json({
                status: 422,
                error: 'status_id is required '
            });
        };

        if (!date_time) {
            return res.status(422).json({
                status: 422,
                error: 'date_time is required '
            });
        };

        if (!total_amount) {
            return res.status(422).json({
                status: 422,
                error: 'total_amount is required '
            });
        };

        if (!pay_type_id) {
            return res.status(422).json({
                status: 422,
                error: 'pay_type_id is required '
            });
        };

        if (!order_product) {
            return res.status(422).json({
                status: 422,
                error: 'products are required '
            });
        };

        let productsError = false;
        let productsErrorMessage = '';
        order_product.forEach(product => {
            const { product_id, quantity, price } = product;

            if (!product_id) {
                productsError = true;
                productsErrorMessage = `product_id is required`;
                return;
            }

            if (!quantity) {
                productsError = true;
                productsErrorMessage = `product_id ${product_id} quantity is required`;
                return;
            }

            if (!price) {
                productsError = true;
                productsErrorMessage = `product_id ${product_id} price is required`;
                return;
            };
        });

        if (productsError) {
            return res.status(422).json({
                status: 422,
                error: productsErrorMessage
            });
        }

        next();

    } catch (error) {
        let message = error.message;

        return res.status(500).json({
            status: 500,
            error: message
        });
    }
}

module.exports = verifyOrder;