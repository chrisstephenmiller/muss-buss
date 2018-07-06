import axios from 'axios'

const GET_TURN = `GET_TURN`
const TOGGLE_DICE = `TOGGLE_DICE`

const defaultTurn = {
  dice: [],
}

export const getTurn = turn => ({ type: GET_TURN, turn })
export const toggleDice = dice => ({ type: TOGGLE_DICE, dice })

export const fetchTurn = game => async dispatch => {
  const gameId = game.id
  const playerId = game.currentPlayer
  try {
    const res = await axios.get(`/api/games/${gameId}/players/${playerId}/turn`)
    dispatch(getTurn(res.data || defaultTurn))
  } catch (err) {
    console.error(err)
  }
}

export const newTurn = game => async dispatch => {
  const gameId = game.id
  const playerId = game.currentPlayer
  try {
    const res = await axios.post(`/api/games/${gameId}/players/${playerId}/turn`)
    dispatch(getTurn(res.data || defaultTurn))
  } catch (err) {
    console.error(err)
  }
}

export const rollDice = (game, dice) => async dispatch => {
  const gameId = game.id
  const playerId = game.currentPlayer
  try {
    const res = await axios.put(`/api/games/${gameId}/players/${playerId}/turn`, dice)
    dispatch(getTurn(res.data || defaultTurn))
  } catch (err) {
    console.error(err)
  }
}

export const endTurn = (gameId, playerId) => async dispatch => {
  try {
    const res = await axios.delete(`/api/games/${gameId}/players/${playerId}/turn`)
    dispatch(getTurn(res.data || defaultTurn))
  } catch (err) {
    console.error(err)
  }
}

export default function (state = defaultTurn, action) {
  switch (action.type) {
    case GET_TURN:
      return action.turn
    case TOGGLE_DICE:
      return {...state, dice: action.dice}
    default:
      return state
  }
}
