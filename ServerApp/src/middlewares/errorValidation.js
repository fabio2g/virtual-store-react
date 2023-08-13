const errorValidation = (req, res, next) => {
    if (req.errors.length == 0) next();

    res.status(401).json({ status: false, error: req.errors });
};

module.exports = errorValidation;
