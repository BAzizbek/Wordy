module.exports = (app) => {
    const mainRoute = require('../routes/main');
    const authRoute = require('../routes/auth');
    const { checkUser } = require('../middlewares/auth');

    app.use('*', checkUser); // for whole project on nav-bar

    app.use('/', mainRoute);
    app.use('/auth', authRoute);
};
