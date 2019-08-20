import axios from 'axios'
import store from '.';
import socket from '../socket'

const GET_GAME = `GET_GAME`

const defaultGame = {
  players: [],
  currentPlayer: {},
  turn: {},
  card: {},
  dice: [],
  score: 0,
  invalidActions: { invalidDraw: true, invalidRoll: true, invalidHolds: [], invalidStop: true, invalidPass: true }
}

export const getGame = (game, gameId) => {
  if (gameId) socket.emit('updateOut', gameId)
  return { type: GET_GAME, game }
}

export const newGameThunk = (winScore, players) => async dispatch => {
  try {
    const res = await axios.post(`/api/games`, { winScore, players })
    const game = res.data
    await dispatch(getGame(game || defaultGame))
    window.location.href = `../games/${game.id}`
  } catch (err) {
    console.error(err)
  }
}

export const getGameThunk = gameId => async dispatch => {
  try {
    const res = await axios.get(`/api/games/${gameId}`)
    const game = res.data
    dispatch(getGame(game || defaultGame))
  } catch (err) {
    console.error(err)
  }
}

export const drawCardThunk = gameId => async dispatch => {
  try {
    const res = await axios.get(`/api/games/${gameId}/draw`)
    const game = res.data
    dispatch(getGame(game || defaultGame, gameId))
  } catch (err) {
    console.error(err)
  }
}

export const rollDiceThunk = gameId => async dispatch => {
  try {
    const res = await axios.get(`/api/games/${gameId}/roll`)
    socket.emit('updateOut', gameId, 'roll')
    const game = res.data
    const lastRoll = await dispatch(rollingAnimation())
    await setTimeout(() => dispatch(getGame(game || defaultGame, gameId)), lastRoll)
  } catch (err) {
    console.error(err)
  }
}

export const rollingAnimation = () => async dispatch => {
  const state = store.getState().game
    if (!state.dice) state.dice = state.prevDice || Array(6).fill(null).map((_, i) => { return { id: i + 1 } })
    const rollState = () => {
      state.dice = state.dice.map(die => {
        if (die.held && !state.card.fill) die.live = false
        else {
          die.live = true
          die.pointer = false
          die.value = Math.ceil(Math.random() * 6)
        }
        return die
      })
      return state
    }
  const numRolls = 7
  const rollLength = 100
  for (let t = 1; t < numRolls; t += 1) setTimeout(() => dispatch(getGame({ ...rollState() } || defaultGame)), t * rollLength)
  return numRolls * rollLength
}

export const holdDiceThunk = (gameId, dieId) => async dispatch => {
  try {
    const res = await axios.get(`/api/games/${gameId}/hold?holdId=${dieId}`)
    const game = res.data
    dispatch(getGame(game || defaultGame, gameId))
  } catch (err) {
    console.error(err)
  }
}

export const stopTurnThunk = gameId => async dispatch => {
  try {
    const res = await axios.get(`/api/games/${gameId}/stop`)
    const game = res.data
    dispatch(getGame(game || defaultGame, gameId))
  } catch (err) {
    console.error(err)
  }
}

export const passTurnThunk = gameId => async dispatch => {
  try {
    const res = await axios.get(`/api/games/${gameId}/pass`)
    const game = res.data
    dispatch(getGame(game || defaultGame, gameId))
  } catch (err) {
    console.error(err)
  }
}

export default function (state = defaultGame, action) {
  switch (action.type) {
    case GET_GAME:
      return action.game
    default:
      return state
  }
}
