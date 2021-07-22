
function adminValidation(req, res, next) {
    try {

        if (!req.user.is_admin) {
            return res.status(403).json({
                status: 403,
                error: 'unauthorized user'
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

module.exports =  adminValidation;