import axios from 'axios'
import { nextTurnThunk, scorePlayersThunk } from '../store';

const NEW_TURN = `NEW_TURN`
const GET_TURN = `GET_TURN`
const TOGGLE_TURN = `TOGGLE_TURN`
const ROLL_TURN = `ROLL_TURN`
const END_TURN = `END_TURN`
const FILL_TURN = `FILL_TURN`
const BUST_TURN = `BUST_TURN`

const defaultTurn = {}

export const newTurn = turn => ({ type: NEW_TURN, turn })
export const getTurn = turn => ({ type: GET_TURN, turn })
export const toggleTurn = turn => ({ type: TOGGLE_TURN, turn })
export const rollTurn = turn => ({ type: ROLL_TURN, turn })
export const fillTurn = turn => ({ type: FILL_TURN, turn })
export const bustTurn = turn => ({ type: BUST_TURN, turn })
export const endTurn = turn => ({ type: END_TURN, turn })

export const newTurnThunk = gameId => async dispatch => {
  try {
    const res = await axios.post(`/api/games/${gameId}/turn`)
    dispatch(newTurn(res.data || defaultTurn))
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
    if (turn.bust) {
      dispatch(bustTurn(turn || defaultTurn))
      dispatch(nextTurnThunk(gameId))
    } else if (turn.fill) {
      dispatch(fillTurn(turn || defaultTurn))
    } else { dispatch(rollTurn(turn || defaultTurn)) }
  } catch (err) {
    console.error(err)
  }
}

export const endTurnThunk = gameId => async dispatch => {
  try {
    const res = await axios.delete(`/api/games/${gameId}/turn`)
    const turn = res.data
    dispatch(endTurn(turn || defaultTurn))
    if (turn.stop && !turn.bust && turn.score) {
      await dispatch(scorePlayersThunk(gameId))
      await dispatch(nextTurnThunk(gameId))
    }
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
