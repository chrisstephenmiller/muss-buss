const router = require('express').Router()
const Player = require('../db/models/player')
const Game = require('../db/models/game')

router.get(`/`, (req, res, next) => {
  try { res.send(req.game.players) }
  catch (err) { next(err) }
})

router.post(`/`, async (req, res, next) => {
  try {
    const names = req.body
    const { id } = req.game
    for (const name of names) { await Player.create({ gameId: id, name }) }
    const newPlayers = await Player.findAll({ where: { gameId: id } })
    const playerIds = newPlayers.map(player => player.id)
    const currentPlayer = playerIds.reduce((prevPlayer, nextPlayer) => Math.min(prevPlayer, nextPlayer))
    Game.update({ currentPlayer }, { where: { id } })
    res.send(newPlayers)
  }
  catch (err) { next(err) }
})

router.put(`/`, async (req, res, next) => {
  try {
    const { game } = req
    const { id, turn } = game
    const playerId = game.currentPlayer
    const player = await Player.findById(playerId)
    const score = turn.score + player.score
    if (!turn.bust) await Player.update({ score }, { where: { id: playerId } })
    const newPlayers = await Player.findAll({ where: { gameId: id } })
    res.send(newPlayers)
  }
  catch (err) { next(err) }
})

router.get(`/:playerId`, (req, res, next) => {
  try { res.send(req.player) }
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
