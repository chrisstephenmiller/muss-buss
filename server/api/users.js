const router = require('express').Router()
const { User } = require('../db/models')

router.get('/', async (req, res, next) => {
  try { res.json(await User.findAll({ attributes: ['id', 'email'] })) }
  catch (err) { next(err) }
})

module.exports = router