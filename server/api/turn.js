const router = require('express').Router()
const DieModel = require('../db/models/die')
const TurnClass = require('../game/turn')
const TurnModel = require('../db/models/turn')

const turn = new TurnClass()

router.get(`/`, async (req, res, next) => {
  try {
    const turnId = req.game.id
    const getTurn = await TurnModel.findById(turnId, {
      attributes: { exclude: [`createdAt`, `updatedAt`] },
      include: {
        model: DieModel, as: `dice`, attributes: {
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
    await TurnModel.create(turn)
    turn.dice.forEach(die => { die.turnId = turnId })
    await DieModel.bulkCreate(turn.dice)
    const postTurn = await TurnModel.findById(turnId, {
      attributes: { exclude: [`createdAt`, `updatedAt`] },
      include: {
        model: DieModel, as: `dice`, attributes: {
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
    const heldDice = req.body
    turn.dice.forEach((die, idx) => {
      die.held = heldDice[idx].held
    })
    turn.roll()
    for (let i = 0; i < turn.dice.length; i++) {
      const die = turn.dice[i]
      await DieModel.update(die, { where: { id: die.id } })
    }
    const putTurn = await TurnModel.findById(turnId, {
      attributes: { exclude: [`createdAt`, `updatedAt`] },
      include: {
        model: DieModel, as: `dice`, attributes: {
          exclude: [`createdAt`, `updatedAt`]
        }
      },
    })
    res.send(putTurn)
  }
  catch (err) { next(err) }
})

module.exports = router