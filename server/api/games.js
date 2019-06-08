const router = require('express').Router()
const Game = require('../game')
const GameDb = require('../db/models/').Game

const gameState = game => {
  const players = game && game.players
  const prevTurn = game && game.prevTurn
  const currentPlayer = game && game._player()
  const turn = currentPlayer && currentPlayer._turn()
  const prevCard = prevTurn && prevTurn._card()
  const card = turn && turn._card() ? turn._card() : prevCard
  const roll = card && card._roll()
  const prevDice = prevTurn && prevTurn._roll().dice
  const dice = roll ? roll.dice : prevDice
  return { players, dice, card, turn, currentPlayer }
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
    // if (game.players[game.currentPlayer].id !== req.user.id) game.error = 'Invalid user.'
    // else
    switch (req.action) {
      case 'draw': game.drawCard()
        break
      case 'roll': game.rollDice()
        break
      case 'stop': game.stopTurn()
        break
      case 'pass': game.passTurn()
        break
      case 'hold': game.holdPointers(Number(req.query.holdId))
    }
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
