import axios from 'axios'
import { rollTurn } from './turn';

const GET_DICE = `GET_DICE`

const defaultDice = []

export const getDice = dice => ({ type: GET_DICE, dice })

export const fetchDice = gameId => async dispatch => {
  try {
    const res = await axios.get(`/api/games/${gameId}/dice`)
    dispatch(getDice(res.data || defaultDice))
  } catch (err) {
    console.error(err)
  }
}

export const newDice = gameId => async dispatch => {
  try {
    const res = await axios.post(`/api/games/${gameId}/dice`)
    dispatch(getDice(res.data || defaultDice))
  } catch (err) {
    console.error(err)
  }
}

export const rollDice = gameId => async dispatch => {
  try {
    const res = await axios.put(`/api/games/${gameId}/dice`)
    dispatch(getDice(res.data || defaultDice))
    dispatch(rollTurn(gameId))
  } catch (err) {
    console.error(err)
  }
}

export const toggleDie = die => async dispatch => {
  try {
    const { gameId } = die
    await axios.put(`/api/games/${gameId}/dice/${die.id}`)
    const res = await axios.get(`/api/games/${gameId}/dice`)
    dispatch(getDice(res.data || defaultDice))
    dispatch(rollTurn(gameId, die))
  } catch (err) {
    console.error(err)
  }
}


export default function (state = defaultDice, action) {
  switch (action.type) {
    case GET_DICE:
      return action.dice
    default:
      return state
  }
}
