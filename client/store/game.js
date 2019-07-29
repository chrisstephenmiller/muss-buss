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
  invalidActions: { invalidDraw: true, invalidRoll: true, invalidHold: true, invalidStop: true, invalidPass: true }
}

export const getGame = game => {
  const gameId = +window.location.pathname.split('/')[2]
  socket.emit('updateOut', gameId)
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
    dispatch(getGame(game || defaultGame))
  } catch (err) {
    console.error(err)
  }
}

export const rollDiceThunk = gameId => async dispatch => {
  try {
    const res = await axios.get(`/api/games/${gameId}/roll`)
    const game = res.data
    const state = store.getState().game
    if (state.dice.length) {
      state.dice = state.dice.map(die => {
        const newDie = { ...die }
        newDie.live = false
        return die.held ? newDie : die
      })
      dispatch(getGame({ ...state } || defaultGame))
    }
    else state.dice = Array(6).fill(null).map((_, i) => { return { id: i + 1 } })
    const rollState = () => {
      state.dice = state.dice.map(die => {
        const newDie = { ...die }
        if (!die.held || state.card.fill) {
          newDie.pointer = false
          newDie.value = Math.ceil(Math.random() * 6)
        }
        return newDie
      })
      return state
    }
    await setTimeout(() => dispatch(getGame({ ...rollState() } || defaultGame)), 100)
    await setTimeout(() => dispatch(getGame({ ...rollState() } || defaultGame)), 200)
    await setTimeout(() => dispatch(getGame({ ...rollState() } || defaultGame)), 300)
    await setTimeout(() => dispatch(getGame({ ...rollState() } || defaultGame)), 400)
    await setTimeout(() => dispatch(getGame(game || defaultGame)), 500)
  } catch (err) {
    console.error(err)
  }
}

export const holdDiceThunk = (gameId, dieId) => async dispatch => {
  try {
    const res = await axios.get(`/api/games/${gameId}/hold?holdId=${dieId}`)
    const game = res.data
    dispatch(getGame(game || defaultGame))
  } catch (err) {
    console.error(err)
  }
}

export const stopTurnThunk = gameId => async dispatch => {
  try {
    const res = await axios.get(`/api/games/${gameId}/stop`)
    const game = res.data
    dispatch(getGame(game || defaultGame))
  } catch (err) {
    console.error(err)
  }
}

export const passTurnThunk = gameId => async dispatch => {
  try {
    const res = await axios.get(`/api/games/${gameId}/pass`)
    const game = res.data
    dispatch(getGame(game || defaultGame))
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
