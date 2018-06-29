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
      attributes: { exclude: [`createdAt`, `updatedAt`] },
      include: [{ model: Die, as: `dice`, attributes: { exclude: [`createdAt`, `updatedAt`, `rollId`] } }]
    })
    res.send(dice)
  } catch (err) {
    next(err)
  }
})

router.put('/', async (req, res, next) => {
  try {
    const heldDice = req.body
    const prevRoll = await Roll.findById(1, {
      attributes: { exclude: [`createdAt`, `updatedAt`] },
      include: [{ model: Die, as: `dice`, attributes: { exclude: [`createdAt`, `updatedAt`, `rollId`] } }]
    })
    turn.dice = prevRoll.toJSON().dice
    turn.dice.forEach((die, idx) => { die.held = heldDice[idx].held })
    turn.roll()
    const { dice } = turn
    res.send(dice)
  } catch (err) {
    next(err)
  }
})

module.exports = router