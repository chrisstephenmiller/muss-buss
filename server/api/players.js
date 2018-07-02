const router = require('express').Router()
const Player = require('../db/models/player')

router.post(`/`, async (req, res, next) => {
  try {
    const gameId = req.game.id
    const player = await Player.create({ ...req.body, gameId })
    res.send(player)
  }
  catch (err) { next(err) }
})

router.param(`playerId`, async (req, res, next, playerId) => {
  try {
    req.player = await Player.findById(playerId)
    next()
  }
  catch (err) { next(err) }
})

router.use('/:playerId/turn', require('./turn'))

module.exports = router