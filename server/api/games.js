const router = require('express').Router()
const Game = require('../game')
const GameDb = require('../db/models/').Game

const gameState = game => {
  const players = game ? game.players : []
  const currentPlayer = game.players[game.currentPlayer]
  const turn = currentPlayer.turns.length && currentPlayer.turns[0]
  const card = turn && turn.cards[0]
  const roll = card && card.rolls[0]
  const prevDice = game.prevTurn && game.prevTurn._roll().dice ? game.prevTurn._roll().dice : []
  const dice = roll ? roll.dice : prevDice
  return { players, dice, card }
}

router.post(`/`, (req, res, next) => {
  const { winScore, players } = req.body
  const game = new Game(null, winScore, players)
  GameDb.create({ game })
  try { res.send(gameState(game)) }
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
  const game = new Game(req.game)
  try { res.send(gameState(game)) }
  catch (err) { next(err) }
})

router.get(`/:gameId/:action/`, (req, res, next) => {
  try {
    const game = new Game(req.game)
    if (req.action === 'draw') game.drawCard()
    if (req.action === 'roll') game.rollDice()
    if (req.action === 'stop') game.stopTurn()
    if (req.action === 'pass') game.passTurn()
    if (game.error) {
      console.log(game.error)
      res.status(403).send(game.error)
    }
    else {
      GameDb.update({ game }, { where: { id: req.gameId } })
      res.send(gameState(game))
    }
  }
  catch (err) { next(err) }
})

router.get(`/:gameId/hold/:holdId`, (req, res, next) => {
  try {
    const game = new Game(req.game)
    game.holdPointers(Number(req.params.holdId))
    if (game.error) {
      console.log(game.error)
      res.status(403).send(game.error)
    }
    else {
      GameDb.update({ game }, { where: { id: req.gameId } })
      res.send(gameState(game))
    }
  }
  catch (err) { next(err) }
})

module.exports = router
