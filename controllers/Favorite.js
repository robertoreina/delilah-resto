const favoritesModels = require('../models/favorite');
const userModels = require('../models/user');

class Favorite {

    // get all favorites
    static async getAll(req, res) {

        try {

            const favorites = await favoritesModels.findAll(
                {
                    include: [
                        'product'
                    ],
                    attributes:
                    {
                        exclude: ['product_id']
                    }
                }
            );

            return res.status(200).json({
                status: 200,
                data: favorites,
                control: {
                    total_count: favorites.length
                }
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                status: 500,
                error: error.message
            })
        }

    };

    // insert new user's favorite
    static async post(req, res) {
        const { product_id } = req.body;
        const { user_id } = req.user;

        if (!product_id) {
            return res.status(422).json({
                status: 422,
                error: 'product_id is required '
            });
        };

        try {
            const favorite = await favoritesModels.create({
                user_id,
                product_id
            });

            // console.log(albums instanceof albumsModel); // true
            // console.log(`id: ${userCreated.id}`); //
            return res.status(201).json({
                status: 201,
                message: 'favorite created',
                data: { favorite_id: favorite.id }
            });

        } catch (error) {

            let message;
            let status;
            switch (error.name) {
                case 'SequelizeUniqueConstraintError':
                    status = 409;
                    message = 'product exists as a user´s favorite';
                    break;
                default:
                    status = 500;
                    message = error.message;
                    break;
            }
            return res.status(status).json({
                status: status,
                error: message
            })
        }
    };

    // get favorites by userId
    static async getByUserId(req, res) {

        try {
            const favorites = await favoritesModels.findAll(
                {
                    where: {
                        user_id: req.params.user_id
                    },
                    include: [
                        'product'
                    ],
                    attributes:
                    {
                        exclude: ['product_id']
                    }
                }
            );

            if (favorites.length === 0) {
                return res.status(404).json({
                    status: 404,
                    error: "user without favorites"
                });
            }

            return res.status(200).json({
                status: 200,
                data: favorites,
                control: {
                    total_count: favorites.length
                }
            });

        } catch (error) {
            return res.status(500).json({
                status: 500,
                error: error.message
            })
        }

    };

    // delete favorite by id
    static async deleteByUserId(req, res) {

        try {
            const favorite = await favoritesModels.destroy({
                where: {
                    id: req.params.favorite_id,
                    user_id: req.params.user_id
                }
            });

            if (!favorite) {
                return res.status(422).json({
                    status: 422,
                    message: 'favorite not found'
                });
            }

            return res.status(202).json({
                status: 202,
                message: 'favorite removed'
            });

        } catch (error) {
            return res.status(500).json({
                status: 500,
                error: error.message
            })
        }
    };


}

module.exports = Favorite;
