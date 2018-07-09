const router = require('express').Router()
const Game = require('../db/models/game')
const Player = require('../db/models/player')
const Turn = require('../db/models/turn')
const Die = require('../db/models/die')

router.get(`/:gameId`, async (req, res, next) => {
  try {
    const gameId = req.game.id
    const game = await Game.findById(gameId, { include: [Turn, Player, { model: Die, as: `dice` }] })
    res.send(game)
  }
  catch (err) { next(err) }
})

router.post(`/`, async (req, res, next) => {
  try {
    const { winScore } = req.body
    const newGame = await Game.create({ winScore })
    res.send(newGame)
  }
  catch (err) { next(err) }
})

router.param(`gameId`, async (req, res, next, gameId) => {
  try {
    const game = await Game.findById(gameId, { include: [Turn, Player, { model: Die, as: `dice` }] })
    req.game = game.get({ plain: true })
    next()
  }
  catch (err) { next(err) }
})

router.use('/:gameId/players', require('./players'))
router.use('/:gameId/turn', require('./turn'))
router.use('/:gameId/dice', require('./dice'))


module.exports = router