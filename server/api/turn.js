const router = require('express').Router()
const Player = require('../db/models/player')
const Die = require('../db/models/die')
const Turn = require('../game/turn')

router.post(`/`, (req, res, next) => {
  const turn = new Turn()
  try {
    const gameId = req.game.id
    turn.dice.forEach(die => {
      Die.create({...die, gameId})
    })
    res.send(`turn`)
  }
  catch (err) { next(err) }
})

module.exports = router