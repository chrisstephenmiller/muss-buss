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
    const gameId = req.game.id
    const turn = new TurnClass(gameId)
    const newTurn = await Turn.create(turn)
    res.send(newTurn)
  }
  catch (err) { next(err) }
})

router.put(`/`, async (req, res, next) => {
  try {
    const gameId = req.game.id
    const turn = new TurnClass(gameId, req.game.turn, req.game.dice, req.body)
    await Turn.update(turn, { where: { gameId } })
    const putTurn = await Turn.findById(gameId)
    res.send(putTurn)
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