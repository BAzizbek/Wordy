const router = require('express').Router();
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const { sessionChecker } = require('../middlewares/authHandler')
const User = require('../models/user')
 
router
  .route('/login')
  .get(sessionChecker, (req, res) => {
    res.render('auth/login')
  })
  .post(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    if(user && (await bcrypt.compare(password, user.password))) {
      req.session.user = user
      res.redirect('/')
    } else {
      res.redirect('/auth/login')
    }
  })

router
  .route('/signup')
  .get(sessionChecker, (req,res) => {
    res.render('auth/signup')
  })
  .post(async (req, res) => {
    const { username, email, password } = req.body;
    const salt = 10;
    const user = new User({
      username,
      email,
      password: await bcrypt.hash(password, salt)
    })
    await user.save();
    req.session.user = user;
    res.redirect('/')
  })

router
  .get('/logout', async (req, res) => {
    if(req.session.user){
      await req.session.destroy();
      res.clearCookie('user_sid');
      res.redirect('/')
    } else {
      res.redirect('/')
    }
  })


module.exports = router
