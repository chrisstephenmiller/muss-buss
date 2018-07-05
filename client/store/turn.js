import axios from 'axios'

/**
 * ACTION TYPES
 */

const GET_TURN = `GET_TURN`

/**
 * INITIAL STATE
 */
const defaultTurn = {
  dice: []
}

/**
 * ACTION CREATORS
 */
export const getTurn = turn => ({ type: GET_TURN, turn })

/**
 * THUNK CREATORS
 */
export const fetchTurn = playerId => async dispatch => {
  try {
    const res = await axios.get(`/api/games/1/players/${playerId}/turn`)
    dispatch(getTurn(res.data || defaultTurn))
  } catch (err) {
    console.error(err)
  }
}

export const startTurn = (gameId, playerId) => async dispatch => {
  try {
    const res = await axios.post(`/api/games/${gameId}/players/${playerId}/turn`)
    dispatch(getTurn(res.data || defaultTurn))
  } catch (err) {
    console.error(err)
  }
}

export const rollDice = (gameId, playerId, dice) => async dispatch => {
  try {
    const res = await axios.put(`/api/games/${gameId}/players/${playerId}/turn`, dice)
    dispatch(getTurn(res.data || defaultTurn))
  } catch (err) {
    console.error(err)
  }
}

export const stopTurn = playerId => async dispatch => {
  try {
    const res = await axios.delete(`/api/games/1/players/${playerId}/turn`)
    dispatch(getTurn(res.data || defaultTurn))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function (state = defaultTurn, action) {
  switch (action.type) {
    case GET_TURN:
      return action.turn
    default:
      return state
  }
}
