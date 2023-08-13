/**
 * Verifica se o usuário tem permições de admin
 */
const isAuthenticated = (req, res, next) => {
    const userRole = req.user.role;

    if (userRole == 0) {
        return next();
    }

    res.status(422).json({
        success: false,
        error: "O usuário não tem permição para axecutar esta ação.",
    });
};

module.exports = isAuthenticated;
