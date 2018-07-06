const router = require('express').Router()
const Die = require('../db/models/die')
const TurnClass = require('../game/turn')
const Turn = require('../db/models/turn')
const Player = require('../db/models/player')
const Game = require('../db/models/game')

const turn = new TurnClass()

router.get(`/`, async (req, res, next) => {
  const turnId = req.game.id
  try {
    const getTurn = await Turn.findById(turnId, {
      attributes: { exclude: [`createdAt`, `updatedAt`,`gameId`] },
      include: {
        model: Die, as: `dice`, attributes: {
          exclude: [`createdAt`, `updatedAt`]
        }
      },
    })
    res.send(getTurn)
  }
  catch (err) { next(err) }
})

router.post(`/`, async (req, res, next) => {
  try {
    const turnId = req.game.id
    turn.gameId = turnId
    await Turn.create(turn)
    turn.dice.forEach(die => { die.turnId = turnId })
    for (let i = 0; i < turn.dice.length; i++) {
      const die = turn.dice[i]
      await Die.create(die)
    }
    const postTurn = await Turn.findById(turnId, {
      attributes: { exclude: [`createdAt`, `updatedAt`,`gameId`] },
      include: {
        model: Die, as: `dice`, attributes: {
          exclude: [`createdAt`, `updatedAt`]
        }
      },
    })
    res.send(postTurn)
  }
  catch (err) { next(err) }
})

router.put(`/`, async (req, res, next) => {
  try {
    const turnId = req.game.id
    const newDice = req.body
    turn.dice = await Die.findAll({
      where: { turnId },
      raw: true,
      attributes: { exclude: [`createdAt`, `updatedAt`] },
    })
    turn.dice.forEach(die => { die.held = newDice.find(newDie => newDie.id === die.id).held })
    turn.roll()
    for (let i = 0; i < turn.dice.length; i++) {
      const die = turn.dice[i]
      await Die.update(die, { where: { id: die.id } })
    }
    await Turn.update(turn, { where: { id: turnId } })
    const putTurn = await Turn.findById(turnId, {
      attributes: { exclude: [`createdAt`, `updatedAt`] },
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