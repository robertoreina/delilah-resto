const usersModels = require('../models/user');
const { Op } = require('sequelize');


async function verifyUser(req, res, next) {

    const { user, name, email, phone, address, password } = req.body;

    if (!user && req.route.path === '/user') {
        return res.status(422).json({
            status: 422,
            error: 'User is required '
        });
    };


    if (!name) {
        return res.status(422).json({
            status: 422,
            error: 'Name is required '
        });
    }

    if (!email && req.route.path === '/user') {
        return res.status(422).json({
            status: 422,
            error: 'Email is required '
        });
    }

    if (!phone) {
        return res.status(422).json({
            status: 422,
            error: 'Phone is required '
        });
    }

    if (!address) {
        return res.status(422).json({
            status: 422,
            error: 'Address is required '
        });
    }

    if (!password) {
        return res.status(422).json({
            status: 422,
            error: 'Password is required '
        });
    }

    if (password.length < 6) {
        return res.status(422).json({
            status: 422,
            error: 'Password has to be bigger than 6 characters'
        });
    }

    if (req.route.path != '/user') {
        return next();
    }

    try {
        const users = await usersModels.findAll(
            {
                where: {
                    [Op.or]: [
                        { user },
                        { email }
                    ]
                }
            }
        );

        if (users.length > 0) {

            return res.status(409).json({
                status: 409,
                error: 'user or email already exists'
            });
        };

        next();

    } catch (error) {

        return res.status(500).json({
            status: 500,
            error: error.message
        });
    }
}

module.exports = { verifyUser };