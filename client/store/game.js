import axios from 'axios'

/**
 * ACTION TYPES
 */

const GET_GAME = `GET_GAME`

/**
 * INITIAL STATE
 */
const defaultGame = []

/**
 * ACTION CREATORS
 */
export const getGame = game => ({type: GET_GAME, game})

/**
 * THUNK CREATORS
 */

export const newGame = winScore => async dispatch => {
  try {
    const res = await axios.post(`/api/games`, winScore)
    dispatch(getGame(res.data || defaultGame))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultGame, action) {
  switch (action.type) {
    case GET_GAME:
      return action.game
    default:
      return state
  }
}
