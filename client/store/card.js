import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CARD = 'GET_CARD'
const NEW_CARD = 'NEW_CARD'

/**
 * INITIAL STATE
 */
const defaultCard = []

/**
 * ACTION CREATORS
 */
const getCard = card => ({type: GET_CARD, card})
const newCard = card => ({type: NEW_CARD, card})

/**
 * THUNK CREATORS
 */
export const fetchCard = () => async dispatch => {
  try {
    // const res = await axios.get('/api/users')
    dispatch(getCard(res.data || defaultCard))
  } catch (err) {
    console.error(err)
  }
}

export const fipCard = () => async dispatch => {
  try {
    // const res = await axios.get('/api/users')
    dispatch(newCard(res.data || defaultCard))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultCard, action) {
  switch (action.type) {
    case GET_CARD:
      return action.card
    case NEW_CARD:
      return action.card
    default:
      return state
  }
}
