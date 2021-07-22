
function verifyProduct(req, res, next) {
    const { description, price} = req.body;

    try {
        if (!description) {
            return res.status(422).json({
                status: 422,
                error: 'description is required '
            });
        };

        if (!price) {
            return res.status(422).json({
                status: 422,
                error: 'price is required '
            });
        };

        next();

    } catch (error) {
        let message = error.message;

        return res.status(500).json({
            status: 500,
            error: message
        });
    }
}

module.exports = verifyProduct;