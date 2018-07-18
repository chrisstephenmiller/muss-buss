const router = require('express').Router()
const Die = require('../db/models/die')
const DiceClass = require('../game/dice')

router.get(`/`, (req, res, next) => {
  try { res.send(req.game.dice) }
  catch (err) { next(err) }
})

router.post(`/`, async (req, res, next) => {
  try {
    const { id, turn } = req.game
    for (const die of new DiceClass(id).dice) { await Die.create(die) }
    const newDice = await Die.findAll({ where: { gameId: id } })
    res.send(newDice)
  }
  catch (err) { next(err) }
})

router.put(`/`, async (req, res, next) => {
  try {
    const { id, dice, turn } = req.game
    const validRoll = dice.some(die => !die.value || (die.held && die.pointer)) || turn.bust || turn.stop
    if (validRoll) for (const die of new DiceClass(id, dice, turn).dice) { await Die.update(die, { where: { id: die.id } }) }
    const newDice = await Die.findAll({ where: { gameId: id } })
    res.send(newDice)
  }
  catch (err) { next(err) }
})

router.put(`/:dieId`, async (req, res, next) => {
  try {
    const { id, dice } = req.game
    const pointers = Array(6).fill(0)
    dice.forEach(die => { if (die.pointer) pointers[die.value - 1]++ })
    const die = req.die
    if (pointers.every(pointer => pointer === 1)) {
      await Die.update({ held: !die.held }, { where: { gameId: id } })
    } else if (pointers[die.value - 1] > 2) {
      await Die.update({ held: !die.held }, { where: { gameId: id, value: die.value } })
    } else {
      await Die.update({ held: !die.held }, { where: { id: die.id } })
    }
    const newDice = await Die.findAll({ where: { gameId: id } })
    res.send(newDice)
  }
  catch (err) { next(err) }
})

router.patch(`/`, async (req, res, next) => {
  try {
    const { id, dice, turn } = req.game
    turn.pass = true
    for (const die of new DiceClass(id, dice, turn).dice) { await Die.update(die, { where: { id: die.id } }) }
    const newDice = await Die.findAll({ where: { gameId: id } })
    res.send(newDice)
  }
  catch (err) { next(err) }
})

router.param(`dieId`, async (req, res, next, dieId) => {
  try {
    req.die = await Die.findById(dieId)
    next()
  }
  catch (err) { next(err) }
})

module.exports = router
