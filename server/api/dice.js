const router = require('express').Router()
const {User} = require('../db/models')
const Turn = require('../game/turn')
module.exports = router

router.get('/', (req, res, next) => {
  try {
    const turn = new Turn
    const dice = turn.dice
    res.send(dice)
  } catch (err) {
    next(err)
  }
})

router.put('/:die', (req, res, next) => {
  try {
    const die = req.params.die
    res.json(die)
  } catch (err) {
    next(err)
  }
})
