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
    for (const die of new DiceClass(id, turn)) { await Die.create(die) }
    const newDice = await Die.findAll({ where: { gameId: id } })
    res.send(newDice)
  }
  catch (err) { next(err) }
})

router.put(`/`, async (req, res, next) => {
  try {
    const { id, dice, turn } = req.game
    const validRoll = dice.some(die => !die.value || (die.held && die.pointer)) || turn.bust
    if (validRoll) for (const die of new DiceClass(id, turn, dice)) { await Die.update(die, { where: { id: die.id } }) }
    const newDice = await Die.findAll({ where: { gameId: id } })
    res.send(newDice)
  }
  catch (err) { next(err) }
})

router.delete(`/`, async (req, res, next) => {
  try {
    const { id, dice, turn } = req.game
    if (dice.every(die => die.scored)) dice.forEach(die => {
      die.held = false
      die.value = 0
    })
    const validStop = dice.some(die => die.held && die.pointer) || turn.bust || dice.every(die => !die.held)
    if (validStop) for (const die of dice) { await Die.update({ ...die, scored: true }, { where: { id: die.id } }) }
    const newDice = await Die.findAll({ where: { gameId: id } })
    res.send(newDice)
  }
  catch (err) { next(err) }
})

router.put(`/:dieId`, async (req, res, next) => {
  try {
    const { id } = req.game
    const die = req.die
    await Die.update({ held: !die.held }, { where: { id: die.id } })
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