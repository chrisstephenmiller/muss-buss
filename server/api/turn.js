const router = require('express').Router()
const Die = require('../db/models/die')
const Turn = require('../game/turn')

const turn = new Turn()

router.get(`/`, async (req, res, next) => {
  try {
    const gameId = req.game.id
    res.send(await Die.findAll({
      where: { gameId },
      attributes: { exclude: [`createdAt`, `updatedAt`, `gameId`] }
    }))
  }
  catch (err) { next(err) }
})

router.post(`/`, async (req, res, next) => {
  try {
    const gameId = req.game.id
    turn.dice.forEach(die => { die.gameId = gameId })
    await Die.bulkCreate(turn.dice)
    res.send(await Die.findAll({ where: { gameId } }))
  }
  catch (err) { next(err) }
})

router.put(`/`, async (req, res, next) => {
  try {
    const gameId = req.game.id
    const heldDice = req.body
    turn.dice.forEach((die, idx) => {
      die.held = heldDice[idx].held
      die.id = heldDice[idx].id
    })
    console.log(turn)
    turn.roll()
    console.log(turn)
    for (let i = 0; i < turn.dice.length; i++) {
      const die = turn.dice[i]
      const { id } = die
      await Die.update(die, { where: { id } })
    }
    res.send(await Die.findAll({
      where: { gameId },
      attributes: { exclude: [`createdAt`, `updatedAt`, `gameId`] }
    }))
  }
  catch (err) { next(err) }
})

module.exports = router