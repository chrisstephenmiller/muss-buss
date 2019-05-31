const router = require('express').Router()
const Game = require('../game')
const GameDb = require('../db/models/').Game

router.post(`/`, (req, res, next) => {
  const { winScore, players } = req.body
  const game = new Game(null, winScore, players)
  GameDb.create({ game })
  try { res.send(game) }
  catch (err) { next(err) }
})

router.param(`gameId`, async (req, res, next, gameId) => {
  try {
    req.gameId = gameId
    const data = await GameDb.findById(gameId, { raw: true })
    req.game = data.game
    next()
  }
  catch (err) { next(err) }
})

router.param(`action`, (req, res, next, action) => {
  try {
    req.action = action
    next()
  }
  catch (err) { next(err) }
})

router.get(`/:gameId`, (req, res, next) => {
  try { res.send(req.game) }
  catch (err) { next(err) }
})

router.get(`/:gameId/:action/`, (req, res, next) => {
  try {
    const game = new Game(req.game)
    if (req.action === 'draw') game.drawCard()
    if (req.action === 'roll') game.rollDice()
    if (req.action === 'stop') game.stopTurn()
    if (req.action === 'pass') game.passTurn()
    GameDb.update({ game }, { where: { id: req.gameId }})
    res.send(game)
  }
  catch (err) { next(err) }
})

router.get(`/:gameId/hold/:holdId`, (req, res, next) => {
  try {
    const game = new Game(req.game)
    game.holdPointers(Number(req.params.holdId))
    GameDb.update({ game }, { where: { id: req.gameId }})
    res.send(game)
  }
  catch (err) { next(err) }
})

module.exports = router
