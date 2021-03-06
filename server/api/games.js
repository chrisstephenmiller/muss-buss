const router = require('express').Router()
const Game = require('../game')
const GameDb = require('../db/models/').Game
const UserDb = require('../db/models/').User
const Promise = require('bluebird')

const gameState = (game, id) => {
  const invalidActions = game._invalidActions()
  const { players, winner, prevTurn, deck } = game
  const deckSize = deck && Object.values(deck).reduce((prev, current) => prev += current.length, 0)
  const currentPlayer = game._player()
  const turn = currentPlayer._turn()
  const prevCard = prevTurn && prevTurn._card()
  const card = turn && turn._card()
  const prevDice = prevCard && prevCard._roll() && prevCard._roll().dice
  const dice = card && card._roll() && card._roll().dice
  if (dice && dice.every(die => die.held || !die.pointer)) invalidActions.invalidHold = true
  const prevScore = prevTurn && prevTurn.score
  const score = card && card.bust ? 0 : turn && (turn.score || turn.inheritance) || prevScore
  return { players, deckSize, currentPlayer, turn, score: score || 0, card, prevCard, dice, prevDice, winner, invalidActions, id }
}

router.post(`/`, async (req, res, next) => {
  try {
    const { winScore, players } = req.body
    const users = await Promise.map(players, id => UserDb.findOrCreate({ where: { id } }))
    const game = new Game(null, winScore, users.map(player => player[0].dataValues))
    const gameDb = await GameDb.create({ game })
    users.forEach(user => user[0].addGames(gameDb))
    res.status(201).json(gameState(game, gameDb.id))
  }
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
  try { res.json(gameState(game)) }
  catch (err) { next(err) }
})

router.get(`/:gameId/:action/`, (req, res, next) => {
  try {
    const game = new Game(req.game)
    const invalidPlayer = game.players[game.playerIndex].id !== req.user.id
    const production = process.env.ENVIRONMENT === 'prod'
    if (production && invalidPlayer) game.error = 'Invalid user.'
    else
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
        break
      default: game.error = 'Invalid action.'
    }
    if (game.error) res.status(403).send(gameState(game))
    else {
      GameDb.update({ game }, { where: { id: req.gameId } })
      res.json(gameState(game))
    }
  }
  catch (err) { next(err) }
})

module.exports = router
