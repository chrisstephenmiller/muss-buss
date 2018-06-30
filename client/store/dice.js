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
export const fetchDice = () => async dispatch => {
  try {
    const res = await axios.get(`/api/dice`)
    dispatch(getDice(res.data || defaultDice))
  } catch (err) {
    console.error(err)
  }
}

export const createDice = () => async dispatch => {
  try {
    const res = await axios.post(`/api/dice`)
    dispatch(getDice(res.data.dice || defaultDice))
  } catch (err) {
    console.error(err)
  }
}

export const rollDice = dice => async dispatch => {
  try {
    const res = await axios.put(`/api/dice`, dice)
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
