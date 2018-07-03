import axios from 'axios'

/**
 * ACTION TYPES
 */

const GET_TURN = `GET_TURN`

/**
 * INITIAL STATE
 */
const defaultTurn = []

/**
 * ACTION CREATORS
 */
export const getTurn = turn => ({type: GET_TURN, turn})

/**
 * THUNK CREATORS
 */
export const fetchTurn = () => async dispatch => {
  try {
    const res = await axios.get(`/api/games/1/players/1/turn`)
    dispatch(getTurn(res.data || defaultTurn))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultTurn, action) {
  switch (action.type) {
    case GET_TURN:
      return action.turn
    default:
      return state
  }
}
