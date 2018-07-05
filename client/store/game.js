import axios from 'axios'
import {newPlayers} from './players'

/**
 * ACTION TYPES
 */

const GET_GAME = `GET_GAME`

/**
 * INITIAL STATE
 */
const defaultGame = {}

/**
 * ACTION CREATORS
 */
export const getGame = game => ({type: GET_GAME, game})

/**
 * THUNK CREATORS
 */

export const newGame = (winScore, players) => async dispatch => {
  try {
    const res = await axios.post(`/api/games`, winScore)
    const game = res.data
    dispatch(getGame(game || defaultGame))
    dispatch(newPlayers(game.id, players))
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
