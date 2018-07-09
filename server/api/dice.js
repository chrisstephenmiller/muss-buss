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
    const { dice } = new DiceClass(gameId)
    for (const die of dice) { await Die.create(die) }
    const newDice = await Die.findAll({ where: { gameId } })
    res.send(newDice)
  }
  catch (err) { next(err) }
})

router.put(`/`, async (req, res, next) => {
  try {
    const gameId = req.game.id
    const { dice } = new DiceClass(gameId, req.game.dice)
    for (const die of dice) {
      const newDie = await Die.update(die, { where: { id: die.id }, returning: true })
    }

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