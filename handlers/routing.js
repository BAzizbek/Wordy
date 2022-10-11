module.exports = (app) => {
    const { checkUser } = require('../middlewares/auth');
    const mainRoute = require('../routes/main');
    const authRoute = require('../routes/auth');
    const listRoute = require('../routes/wordsList');

    app.use('*', checkUser); // for whole project on nav-bar
    app.use('/', mainRoute);
    app.use('/auth', authRoute);
    app.use('/list', listRoute);
};
