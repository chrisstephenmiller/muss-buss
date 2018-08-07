import axios from 'axios'

const NEW_CARD = `NEW_CARD`
const GET_CARD = `GET_CARD`

const defaultCard = []

export const newCard = card => ({type: NEW_CARD, card})
export const getCard = card => ({type: GET_CARD, card})

export const newCardThunk = (gameId, card) => async dispatch => {
  try {
    const res = await axios.post(`/api/games/${gameId}/card`, card)
    dispatch(newCard(res.data || defaultCard))
  } catch (err) {
    console.error(err)
  }
}

export const getCardThunk = gameId => async dispatch => {
  try {
    const res = await axios.get(`/api/games/${gameId}/card`)
    dispatch(getCard(res.data || defaultCard))
  } catch (err) {
    console.error(err)
  }
}

export default function(state = defaultCard, action) {
  switch (action.type) {
    case NEW_CARD:
      return action.card
    case GET_CARD:
      return action.card
    default:
      return state
  }
}
