const router = require('express').Router()
const TurnClass = require('../game/turn')
const Turn = require('../db/models/turn')
const Player = require('../db/models/player')

router.get(`/`, (req, res, next) => {
  try { res.send(req.game.turn) }
  catch (err) { next(err) }
})

router.post(`/`, async (req, res, next) => {
  try {
    const { id } = req.game
    const newDice = await Turn.create(new TurnClass(id))
    res.send(newDice)
  }
  catch (err) { next(err) }
})

router.patch(`/`, async (req, res, next) => {
  try {
    const { id, turn, dice } = req.game
    const newDice = await Turn.update(new TurnClass(id, turn, dice), { where: { id }, returning: true })
    res.send(newDice[1][0])
  }
  catch (err) { next(err) }
})

router.put(`/`, async (req, res, next) => {
  try {
    const { id, turn, dice } = req.game
    const newDice = await Turn.update(new TurnClass(id, turn, dice, req.body), { where: { id }, returning: true })
    res.send(newDice[1][0])
  }
  catch (err) { next(err) }
})

router.delete(`/`, async (req, res, next) => {
  try {
    const { game } = req
    const { players, turn, dice } = game
    if (dice.every(die => die.scored)) turn.score = 0
    const score = turn.score + players.find(player => player.id === game.currentPlayer).score
    await Player.update({ score }, { where: { id: game.currentPlayer } })
    await Turn.update(turn, { where: { gameId: game.id } })
    const newTurn = await Turn.findById(turn.id, { raw: true })
    res.send(newTurn)
  }
  catch (err) { next(err) }
})

module.exports = router