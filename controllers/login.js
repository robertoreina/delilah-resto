const config = require('../config');
const usersModels = require('../models/user');
const jwt = require('jsonwebtoken');


async function login(req, res) {
    const { user, password } = req.body;

    if (!user || !password) {
        return res.status(401).json({
            status: 401,
            error: 'Invalid username or password.'
        });
    };

    try {
        const users = await usersModels.findOne(
            {
                where: {
                    user,
                    password
                },
                attributes: {
                    exclude: ['password']
                }
            }
        );

        if (!users) {
            return res.status(401).json({
                status: 401,
                error: 'Invalid username or password.'
            });
        };

        const token = jwt.sign({
            user: {
                user_id: users.id,
                is_admin: users.is_admin
            }
        }, config.jwt_secret);

        return res.json({
            status: 200,
            token: token,
            data: users
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            error
        });
    };

};

module.exports = { login };
