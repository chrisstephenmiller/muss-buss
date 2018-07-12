const router = require('express').Router()
const Die = require('../db/models/die')
const DiceClass = require('../game/dice')

router.get(`/`, (req, res, next) => {
  try { res.send(req.game.dice) }
  catch (err) { next(err) }
})

router.post(`/`, async (req, res, next) => {
  try {
    const gameId = req.game.id
    const { dice } = new DiceClass(gameId, req.game.turn)
    for (const die of dice) { await Die.create(die) }
    const newDice = await Die.findAll({ where: { gameId } })
    res.send(newDice)
  }
  catch (err) { next(err) }
})

router.put(`/`, async (req, res, next) => {
  try {
    const gameId = req.game.id
    if (req.game.dice.some(die => !die.value || (die.held && die.pointer) || req.game.turn.bust)) {
      const { dice } = new DiceClass(gameId, req.game.turn, req.game.dice)
      for (const die of dice) { await Die.update(die, { where: { id: die.id } }) }
    }
    const newDice = await Die.findAll({ where: { gameId } })
    res.send(newDice)
  }
  catch (err) { next(err) }
})

router.delete(`/`, async (req, res, next) => {
  try {
    const gameId = req.game.id
    const { dice } = req.game
    if (dice.every(die => die.scored)) dice.forEach(die => {
      die.held = false
      die.value = 0
    })
    for (const die of dice) { await Die.update({ ...die, scored: true }, { where: { id: die.id } }) }
    const newDice = await Die.findAll({ where: { gameId } })
    res.send(newDice)
  }
  catch (err) { next(err) }
})

router.put(`/:dieId`, async (req, res, next) => {
  try {
    const gameId = req.game.id
    const die = req.die
    const held = !die.held
    await Die.update({ held }, { where: { id: die.id } })
    const newDice = await Die.findAll({ where: { gameId } })
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