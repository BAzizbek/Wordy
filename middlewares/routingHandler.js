module.exports = (app) => {
  //routes
  const indexRouter = require('../routes/index');
  const authRouter = require('../routes/auth');
  const { checkUser } = require('../middlewares/authHandler');
  
  app.use('*', checkUser) // for whole project on nav-bar
  
  app.use('/',indexRouter);
  app.use('/auth', authRouter);
}
