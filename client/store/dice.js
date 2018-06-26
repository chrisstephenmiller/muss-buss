import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_DICE = 'GET_DICE'

/**
 * INITIAL STATE
 */
const defaultDice = []

/**
 * ACTION CREATORS
 */
const getDice = dice => ({type: GET_DICE, dice})

/**
 * THUNK CREATORS
 */
export const fetchDice = () => async dispatch => {
  try {
    const res = await axios.get('/api/dice')
    dispatch(getDice(res.data || defaultDice))
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
