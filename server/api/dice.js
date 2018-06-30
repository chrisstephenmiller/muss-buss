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
    for (let i = 0; i < turn.dice.length; i++) {
      const die = turn.dice[i]
      die.held = heldDice[i].held
      console.log(die)
      const newDie = await Die.update(die, { where: { id: die.id }, returning: true, })
      console.log(newDie[1][0].dataValues)
    }
    turn.roll()
    turn.dice.forEach(die => {
      Die.update(die, { where: { id: die.id }, returning: true, })
    })
    const { dice } = turn
    res.send(dice)
  } catch (err) {
    next(err)
  }
})

module.exports = router