const router = require('express').Router()
const Player = require('../db/models/player')

router.get(`/`, async (req, res, next) => {
  try {
    const gameId = req.game.id
    const players = await Player.findAll({ where: { gameId } })
    res.send(players)
  }
  catch (err) { next(err) }
})

router.post(`/`, async (req, res, next) => {
  try {
    const gameId = req.game.id
    const players = req.body
    for (const name of players) {
      await Player.create({ name, gameId })
    }
    const newPlayers = await Player.findAll({ where: { gameId }, attributes: [`id`,`name`, `score`] })
    res.send(newPlayers)
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