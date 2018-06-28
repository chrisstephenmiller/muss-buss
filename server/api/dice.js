const router = require('express').Router()
const { Dice } = require('../db/models')
const Turn = require('../game/turn')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const { dice } = await Dice.findById(1, {
      attributes: [`dice`]
    })
    res.send(dice)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const turn = new Turn
    const { dice } = turn
    await Dice.create({ dice })
    res.send(dice)
  } catch (err) {
    next(err)
  }
})

router.put('/', (req, res, next) => {
  try {
    const turn = new Turn
    turn.dice.forEach((die, idx) => die.value = req.body[idx])
    turn.roll()
    const { dice } = turn
    res.send(dice)
  } catch (err) {
    next(err)
  }
})