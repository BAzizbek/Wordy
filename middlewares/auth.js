const jwt = require('jsonwebtoken');
const User = require('../models/user');

const JWT_SECRET = process.env.JWT_SECRET;
const MAX_AGE = 3 * 24 * 60 * 60;

let user = {};

const createToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, {
        expiresIn: MAX_AGE,
    });
};

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    console.log(user);
    if (token) {
        jwt.verify(token, JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                console.log(err);
                next();
            } else {
                if (!user) {
                    user = await User.findById(decodedToken.id);
                }
                res.locals.user = user;
                next();
            }
        });
    } else {
        res.locals.user = null;
        user = null;
        next();
    }
};

module.exports = { checkUser, createToken };
