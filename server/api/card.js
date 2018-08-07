const router = require('express').Router()
const Deck = require('../db/models/deck')

router.get(`/`, (req, res, next) => {
  try {
    const { deck } = req.game
    console.log(deck)
    res.send(`card`)
  }
  catch (err) { next(err) }
})

router.post(`/`, async (req, res, next) => {
  try {
    const { id, turn, dice } = req.game
    await Turn.update(new TurnClass(id, turn, dice, roll = false), { where: { id } })
    const newTurn = await Turn.findById(turn.id)
    res.send(newTurn)
  }
  catch (err) { next(err) }
})

router.put(`/`, async (req, res, next) => {
  try {
    const { deck } = req.game
    const cards = []
    for (const card in deck) if (![`id`, `createdAt`, `updatedAt`, `gameId`].includes(card)) for (let i = 0; i < deck[card]; i++)cards.push(card)
    Deck.console.log(cards[Math.floor(Math.random() * cards.length)])
    res.send(`done`)
  }
  catch (err) { next(err) }
})

// router.put(`/`, async (req, res, next) => {
//   try {
//     const { id, turn, dice } = req.game
//     await Turn.update(new TurnClass(id, turn, dice, roll = true), { where: { id } })
//     const newTurn = await Turn.findById(turn.id)
//     res.send(newTurn)
//   }
//   catch (err) { next(err) }
// })

// router.delete(`/`, async (req, res, next) => {
//   try {
//     const { id, turn, dice } = req.game
//     if (dice.some(die => die.scored) || turn.stop) await Turn.update(turn.stop ? { ...turn, bust: true, score: 0 } : { ...turn, stop: true }, { where: { id } })
//     const newTurn = await Turn.findById(turn.id)
//     res.send(newTurn)
//   }
//   catch (err) { next(err) }
// })

module.exports = router
