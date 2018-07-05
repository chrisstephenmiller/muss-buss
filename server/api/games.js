const router = require('express').Router()
const Game = require('../db/models/game')

router.post(`/`, async (req, res, next) => {
  try {
    const { winScore } = req.body
    const game = await Game.create({ winScore })
    res.send({winScore: game.winScore, id: game.id, currentPlayer: game.currentPlayer})
  }
  catch (err) { next(err) }
})

router.param(`gameId`, async (req, res, next, gameId) => {
  try {
    req.game = await Game.findById(gameId)
    next()
  }
  catch (err) { next(err) }
})

router.use('/:gameId/players', require('./players'))

module.exports = router