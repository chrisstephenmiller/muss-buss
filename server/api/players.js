const router = require('express').Router()
const Player = require('../db/models/player')

router.post(`/`, async (req, res, next) => {
  try {
    const gameId = req.game.id
    const { players } = req.body
    const player = await Player.create({ ...players, gameId })
    res.send({id: player.id, name: player.name, score: player.score})
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