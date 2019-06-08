import axios from 'axios'
import store from '.';

const NEW_GAME = `NEW_GAME`
const GET_GAME = `GET_GAME`
const DRAW_CARD = `DRAW_CARD`
const ROLL_DICE = `ROLL_DICE`
const HOLD_DICE = `HOLD_DICE`
const STOP_TURN = `STOP_TURN`
const PASS_TURN = `PASS_TURN`

const defaultGame = {
  players: [],
  dice: [],
  turn: {},
  card: {},
  currentPlayer: {id: 0}
}

export const newGame = game => ({ type: NEW_GAME, game })
export const getGame = game => ({ type: GET_GAME, game })
export const drawCard = game => ({ type: DRAW_CARD, game })
export const rollDice = game => ({ type: ROLL_DICE, game })
export const holdDice = game => ({ type: HOLD_DICE, game })
export const stopTurn = game => ({ type: STOP_TURN, game })
export const passTurn = game => ({ type: PASS_TURN, game })

export const newGameThunk = (winScore, players) => async dispatch => {
  try {
    const res = await axios.post(`/api/games`, { winScore, players })
    const game = res.data
    await dispatch(newGame(game || defaultGame))
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
  const state = store.getState().game
  const {currentPlayer, players, dice} = state
  console.log(state)
  try {
    const rolling = {
      currentPlayer,
      players,
      dice: dice && dice.map(die => {
        const newDie = { ...die }
        if (!die.held) newDie.value = newDie.pointer = 0  
        return newDie
      })
    }
    dispatch(rollDice(rolling || defaultGame))
    const res = await axios.get(`/api/games/${gameId}/roll`)
    const game = res.data
    setTimeout(() => dispatch(getGame(game || defaultGame)), 300)
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
