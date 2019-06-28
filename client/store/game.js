import axios from 'axios'
import store from '.';
import socket from '../socket'

const NEW_GAME = `NEW_GAME`
const GET_GAME = `GET_GAME`
const DRAW_CARD = `DRAW_CARD`
const SHAKE_DICE = `SHAKE_DICE`
const ROLL_DICE = `ROLL_DICE`
const HOLD_DICE = `HOLD_DICE`
const STOP_TURN = `STOP_TURN`
const PASS_TURN = `PASS_TURN`

const defaultGame = {
  players: [],
  currentPlayer: {},
  turn: {},
  card: {},
  dice: [],
  score: 0,
  actions: {invalidDraw: true, invalidRoll: true, invalidHold: true, invalidStop: true, invalidPass: true}
}

export const newGame = game => ({ type: NEW_GAME, game })
export const getGame = game => ({ type: GET_GAME, game })

export const drawCard = game => {
  const gameId = +window.location.pathname.split('/')[2]
  socket.emit('updateOut', gameId)
  return ({ type: DRAW_CARD, game })
}
export const shakeDice = game => {
  const gameId = +window.location.pathname.split('/')[2]
  socket.emit('updateOut', gameId)
  return ({ type: SHAKE_DICE, game })
}
export const rollDice = game => {
  const gameId = +window.location.pathname.split('/')[2]
  socket.emit('updateOut', gameId)
  return ({ type: ROLL_DICE, game })
}
export const holdDice = game => {
  const gameId = +window.location.pathname.split('/')[2]
  socket.emit('updateOut', gameId)
  return ({ type: HOLD_DICE, game })
}
export const stopTurn = game => {
  const gameId = +window.location.pathname.split('/')[2]
  socket.emit('updateOut', gameId)
  return ({ type: STOP_TURN, game })
}
export const passTurn = game => {
  const gameId = +window.location.pathname.split('/')[2]
  socket.emit('updateOut', gameId)
  return ({ type: PASS_TURN, game })
}

export const newGameThunk = (winScore, players) => async dispatch => {
  try {
    const res = await axios.post(`/api/games`, { winScore, players })
    const game = res.data
    await dispatch(newGame(game || defaultGame))
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
    dispatch(drawCard(game || defaultGame))
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
      dispatch(shakeDice({...state} || defaultGame))
    }
    else state.dice = Array(6).fill(null).map((_, i) => { return { id: i + 1 } })
    const rollState = () => {
     state.dice = state.dice.map(die => {
      const newDie = { ...die }
      if (!die.held) {
        newDie.pointer = false
        newDie.value = Math.ceil(Math.random() * 6)
      }
      return newDie
    })
    return state
  }
    setTimeout(() => dispatch(shakeDice({...rollState()} || defaultGame)), 100)
    setTimeout(() => dispatch(shakeDice({...rollState()} || defaultGame)), 200)
    setTimeout(() => dispatch(shakeDice({...rollState()} || defaultGame)), 300)
    setTimeout(() => dispatch(shakeDice({...rollState()} || defaultGame)), 400)
    setTimeout(() => dispatch(rollDice(game || defaultGame)), 500)
  } catch (err) {
    console.error(err)
  }
}

export const holdDiceThunk = (gameId, dieId) => async dispatch => {
  try {
    const res = await axios.get(`/api/games/${gameId}/hold?holdId=${dieId}`)
    const game = res.data
    dispatch(holdDice(game || defaultGame))
  } catch (err) {
    console.error(err)
  }
}

export const stopTurnThunk = gameId => async dispatch => {
  try {
    const res = await axios.get(`/api/games/${gameId}/stop`)
    const game = res.data
    dispatch(stopTurn(game || defaultGame))
  } catch (err) {
    console.error(err)
  }
}

export const passTurnThunk = gameId => async dispatch => {
  try {
    const res = await axios.get(`/api/games/${gameId}/pass`)
    const game = res.data
    dispatch(passTurn(game || defaultGame))
  } catch (err) {
    console.error(err)
  }
}

export default function (state = defaultGame, action) {
  switch (action.type) {
    case NEW_GAME:
      return action.game
    case GET_GAME:
      return action.game
    case DRAW_CARD:
      return action.game
    case STOP_TURN:
      return action.game
    case SHAKE_DICE:
      return action.game
    case ROLL_DICE:
      return action.game
    case HOLD_DICE:
      return action.game
    case PASS_TURN:
      return action.game
    default:
      return state
  }
}
