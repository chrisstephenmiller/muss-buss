const router = require('express').Router()
const { Roll, Die } = require('../db/models')
const Turn = require('../game/turn')

const turn = new Turn

router.get('/', async (req, res, next) => {
  try {
    const dice = await Roll.findById(1)
    res.send(dice)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const roll = await Roll.create()
    for (let i = 0; i < turn.dice.length; i++) {
      turn.dice[i].rollId = roll.id
      await Die.create(turn.dice[i])
    }
    const dice = await Roll.findById(roll.id, {
      include: [{ model: Die, as: `dice`, attributes: { exclude: [`createdAt`, `updatedAt`, `rollId`] } }],
      attributes: {
        exclude: [`createdAt`, `updatedAt`],
      }
    })
    res.send(dice)
  } catch (err) {
    next(err)
  }
})

router.put('/', (req, res, next) => {
  try {
    turn.dice.forEach((die, idx) => die.value = req.body[idx])
    turn.roll()
    const { dice } = turn
    res.send(dice)
  } catch (err) {
    next(err)
  }
})

module.exports = router