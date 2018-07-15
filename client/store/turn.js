import axios from 'axios'
import { passDice } from './dice';

const GET_TURN = `GET_TURN`
const TOGGLE_TURN = `TOGGLE_TURN`
const ROLL_TURN = `ROLL_TURN`
const END_TURN = `END_TURN`
const FILL_TURN = `FILL_TURN`
const BUST_TURN = `BUST_TURN`

const defaultTurn = {}

export const getTurn = turn => ({ type: GET_TURN, turn })
export const toggleTurn = turn => ({ type: TOGGLE_TURN, turn })
export const rollTurn = turn => ({ type: ROLL_TURN, turn })
export const fillTurn = turn => ({ type: FILL_TURN, turn })
export const bustTurn = turn => ({ type: BUST_TURN, turn })
export const endTurn = turn => ({ type: END_TURN, turn })

export const newTurnThunk = gameId => async dispatch => {
  try {
    const res = await axios.post(`/api/games/${gameId}/turn`)
    dispatch(getTurn(res.data || defaultTurn))
  } catch (err) {
    console.error(err)
  }
}

export const getTurnThunk = gameId => async dispatch => {
  try {
    const res = await axios.get(`/api/games/${gameId}/turn`)
    dispatch(getTurn(res.data || defaultTurn))
  } catch (err) {
    console.error(err)
  }
}

export const toggleTurnThunk = gameId => async dispatch => {
  try {
    const res = await axios.patch(`/api/games/${gameId}/turn`)
    dispatch(toggleTurn(res.data || defaultTurn))
  } catch (err) {
    console.error(err)
  }
}

export const rollTurnThunk = gameId => async dispatch => {
  try {
    const res = await axios.put(`/api/games/${gameId}/turn`)
    const turn = res.data
    if (turn.bust) { console.log(`bust`) }
    else if (turn.fill) { console.log(`fill`) }
    else { dispatch(rollTurn(res.data || defaultTurn)) }
  } catch (err) {
    console.error(err)
  }
}

export const endTurnThunk = gameId => async dispatch => {
  try {
    const res = await axios.delete(`/api/games/${gameId}/turn`)
    dispatch(getTurn(res.data || defaultTurn))
    dispatch(passDice(gameId))
  } catch (err) {
    console.error(err)
  }
}

export const fillTurnThunk = (gameId, die) => async dispatch => {
  try {
    const res = await axios.put(`/api/games/${gameId}/turn`, die)
    dispatch(fillTurn(res.data || defaultTurn))
  } catch (err) {
    console.error(err)
  }
}

export const bustTurnThunk = (gameId, die) => async dispatch => {
  try {
    const res = await axios.put(`/api/games/${gameId}/turn`, die)
    dispatch(bustTurn(res.data || defaultTurn))
  } catch (err) {
    console.error(err)
  }
}

export default function (state = defaultTurn, action) {
  switch (action.type) {
    case GET_TURN:
      return action.turn
    case TOGGLE_TURN:
      return action.turn
    case ROLL_TURN:
      return action.turn
    case FILL_TURN:
      return action.turn
    case BUST_TURN:
      return action.turn
    case END_TURN:
      return action.turn
    default:
      return state
  }
}
