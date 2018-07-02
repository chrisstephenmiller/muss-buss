const router = require('express').Router()
const Game = require('../db/models/game')

router.post(`/`, async (req, res, next) => {
  try {
    const game = await Game.create(req.body)
    res.send(game)
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