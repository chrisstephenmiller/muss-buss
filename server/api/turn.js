const router = require('express').Router()
const TurnClass = require('../game/turn')
const Turn = require('../db/models/turn')

router.get(`/`, (req, res, next) => {
  try { res.send(req.game.turn) }
  catch (err) { next(err) }
})

router.post(`/`, async (req, res, next) => {
  try {
    const { id } = req.game
    const newTurn = await Turn.create(new TurnClass(id))
    res.send(newTurn)
  }
  catch (err) { next(err) }
})

router.patch(`/`, async (req, res, next) => {
  try {
    const { id, turn, dice } = req.game
    await Turn.update(new TurnClass(id, turn, dice, roll = false), { where: { id } })
    const newTurn = await Turn.findById(turn.id)
    res.send(newTurn)
  }
  catch (err) { next(err) }
})

router.put(`/`, async (req, res, next) => {
  try {
    const { id, turn, dice } = req.game
    await Turn.update(new TurnClass(id, turn, dice, roll = true), { where: { id } })
    const newTurn = await Turn.findById(turn.id)
    res.send(newTurn)
  }
  catch (err) { next(err) }
})

router.delete(`/`, async (req, res, next) => {
  try {
    const { id, turn, dice } = req.game
    if (dice.some(die => die.scored) || turn.stop) await Turn.update(turn.stop ? { ...turn, bust: true, score: 0 } : { ...turn, stop: true }, { where: { id } })
    const newTurn = await Turn.findById(turn.id)
    res.send(newTurn)
  }
  catch (err) { next(err) }
})

module.exports = router
