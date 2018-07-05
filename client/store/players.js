import axios from 'axios'

/**
 * ACTION TYPES
 */

const GET_PLAYERS = `GET_PLAYERS`

/**
 * INITIAL STATE
 */
const defaultPlayers = []

/**
 * ACTION CREATORS
 */
export const getPlayers = players => ({type: GET_PLAYERS, players})

/**
 * THUNK CREATORS
 */

export const fetchPlayers = gameId => async dispatch => {
  try {
    const res = await axios.get(`/api/games/${gameId}/players`)
    dispatch(getPlayers(res.data || defaultPlayers))
  } catch (err) {
    console.error(err)
  }
}

export const newPlayers = (gameId, players) => async dispatch => {
  try {
    const res = await axios.post(`/api/games/${gameId}/players`, players)
    dispatch(getPlayers(res.data || defaultPlayers))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultPlayers, action) {
  switch (action.type) {
    case GET_PLAYERS:
      return action.players
    default:
      return state
  }
}
