const router = require('express').Router()
const { User, Game } = require('../db/models/')
module.exports = router

router.post('/login', async (req, res, next) => {
  const user = await User.findOne({ where: { email: req.body.email }, include: Game })
  if (!user) {
    console.log('No such user found:', req.body.email)
    res.status(401).send('Wrong username and/or password')
  } else if (!user.correctPassword(req.body.password)) {
    console.log('Incorrect password for user:', req.body.email)
    res.status(401).send('Wrong username and/or password')
  } else {
    req.login(user, err => (err ? next(err) : res.json(user)))
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const newUser = await User.create(req.body)
    const user = await User.findById(newUser.id, { include: Game })
    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))
