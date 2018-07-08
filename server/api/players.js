const router = require('express').Router()
const Player = require('../db/models/player')

router.get(`/`, (req, res, next) => {
  try { res.send(req.game.players) }
  catch (err) { next(err) }
})

router.get(`/:playerId`, async (req, res, next) => {
  try { res.send(req.player) }
  catch (err) { next(err) }
})

router.post(`/`, async (req, res, next) => {
  try {
    const gameId = req.game.id
    const names = req.body
    for (const name of names) { await Player.create({ gameId, name }) }
    const newPlayers = await Player.findAll({ where: { gameId } })
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

module.exports = router