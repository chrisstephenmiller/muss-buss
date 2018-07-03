import axios from 'axios'

/**
 * ACTION TYPES
 */

const GET_DICE = `GET_DICE`

/**
 * INITIAL STATE
 */
const defaultDice = []

/**
 * ACTION CREATORS
 */
export const getDice = dice => ({type: GET_DICE, dice})

/**
 * THUNK CREATORS
 */

export const createDice = (gameId, playerId) => async dispatch => {
  try {
    const res = await axios.post(`/api/games/${gameId}/players/${playerId}/turn`)
    dispatch(getDice(res.data.dice || defaultDice))
  } catch (err) {
    console.error(err)
  }
}

export const rollDice = (gameId, playerId, dice) => async dispatch => {
  try {
    const res = await axios.put(`/api/games/${gameId}/players/${playerId}/turn`, dice)
    dispatch(getDice(res.data.dice || defaultDice))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultDice, action) {
  switch (action.type) {
    case GET_DICE:
      return action.dice
    default:
      return state
  }
}
