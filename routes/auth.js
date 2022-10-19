const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { createToken } = require('../middlewares/auth');
const User = require('../models/user');

router
    .route('/login')
    .get((_, res) => {
        if (!res.locals.user) {
            res.render('auth/login');
        } else {
            res.redirect('/');
        }
    })
    .post(async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email });

            if (user && (await bcrypt.compare(password, user.password))) {
                const token = createToken(user._id);
                res.cookie('jwt', token, {
                    httpOnly: true,
                    maxAge: 3 * 24 * 60 * 60 * 1000,
                });
                res.redirect('/');
            } else {
                res.redirect('/auth/login');
            }
        } catch (error) {
            console.log(error);
        }
    });

router
    .route('/signup')
    .get((_, res) => {
        if (!res.locals.user) {
            res.render('auth/signup');
        } else {
            res.redirect('/');
        }
    })
    .post(async (req, res) => {
        const { username, email, password } = req.body;
        try {
            const user = await User.create({
                username,
                email,
                password,
            });
            const token = createToken(user._id);
            res.cookie('jwt', token, {
                httpOnly: true,
                maxAge: 3 * 24 * 60 * 60 * 1000,
            });
            res.redirect('/');
        } catch (error) {
            console.error(error);
            res.render('errors', {
                code: 404,
                message: 'Can not create user',
            });
        }
    });

router.get('/logout', async (_, res) => {
    res.clearCookie('jwt');
    res.redirect('/');
});

module.exports = router;
