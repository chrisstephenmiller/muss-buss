const router = require('express').Router()
const Die = require('../db/models/die')
const TurnClass = require('../game/turn')
const Turn = require('../db/models/turn')
const Player = require('../db/models/player')
const Game = require('../db/models/game')

router.get(`/`, (req, res, next) => {
  try { res.send(req.game.turn) }
  catch (err) { next(err) }
})

router.post(`/`, async (req, res, next) => {
  try {
    const gameId = req.game.id
    const turn = new TurnClass(gameId)
    const newTurn = await Turn.create(turn)
    res.send(newTurn)
  }
  catch (err) { next(err) }
})

router.put(`/`, async (req, res, next) => {
  try {
    const gameId = req.game.id
    const turn = new TurnClass(gameId, req.game.dice)
    turn.roll()
    if (roll) {
      turn.roll()
      for (const die of turn.dice) { await Die.update(die, { where: { id: die.id } }) }
    } else { turn.calcScore() }
    await Turn.update(turn, { where: { id: turnId } })
    const putTurn = await Turn.findById(turnId, {
      attributes: { exclude: [`createdAt`, `updatedAt`, `gameId`] },
      include: {
        model: Die, as: `dice`, attributes: {
          exclude: [`createdAt`, `updatedAt`]
        }
      },
    })
    res.send(putTurn)
  }
  catch (err) { next(err) }
})

router.delete(`/`, async (req, res, next) => {
  const turn = new TurnClass()
  try {
    const turnId = req.game.id
    turn.dice = await Die.findAll({
      where: { turnId },
      raw: true,
      attributes: { exclude: [`createdAt`, `updatedAt`] },
    })
    turn.stop()
    const game = await Game.findById(1, { include: Player })
    await Player.update({ score: turn.score }, { where: { id: game.currentPlayer } })
    await Die.destroy({ where: { turnId } })
    const nextPlayer = game.currentPlayer % game.players.length + 1
    game.update({ currentPlayer: nextPlayer })
    res.send(turn)
  }
  catch (err) { next(err) }
})

module.exports = router