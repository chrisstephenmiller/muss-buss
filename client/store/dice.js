import axios from 'axios'
import { toggleTurn, rollTurnThunk } from './turn';

const GET_DICE = `GET_DICE`
const TOGGLE_DIE = `TOGGLE_DIE`
const ROLL_DICE = `ROLL_DICE`
const PASS_DICE = `PASS_DICE`

const defaultDice = []

export const getDice = dice => ({ type: GET_DICE, dice })
export const toggleDie = dice => ({ type: TOGGLE_DIE, dice })
export const rollDice = dice => ({ type: ROLL_DICE, dice })
export const passDice = dice => ({ type: PASS_DICE, dice })

export const newDiceThunk = gameId => async dispatch => {
  try {
    const res = await axios.post(`/api/games/${gameId}/dice`)
    dispatch(getDice(res.data || defaultDice))
  } catch (err) {
    console.error(err)
  }
}

export const getDiceThunk = gameId => async dispatch => {
  try {
    const res = await axios.get(`/api/games/${gameId}/dice`)
    dispatch(getDice(res.data || defaultDice))
  } catch (err) {
    console.error(err)
  }
}

export const toggleDieThunk = die => async dispatch => {
  try {
    const { gameId } = die
    await axios.put(`/api/games/${gameId}/dice/${die.id}`)
    const res = await axios.get(`/api/games/${gameId}/dice`)
    dispatch(toggleDie(res.data || defaultDice))
    dispatch(toggleTurn(gameId))
  } catch (err) {
    console.error(err)
  }
}

export const rollDiceThunk = gameId => async dispatch => {
  try {
    const res = await axios.put(`/api/games/${gameId}/dice`)
    dispatch(rollDice(res.data || defaultDice))
    dispatch(rollTurnThunk(gameId))
  } catch (err) {
    console.error(err)
  }
}

export const passDiceThunk = gameId => async dispatch => {
  try {
    const res = await axios.delete(`/api/games/${gameId}/next`)
    dispatch(passDice(res.data || defaultDice))
  } catch (err) {
    console.error(err)
  }
}

export default function (state = defaultDice, action) {
  switch (action.type) {
    case GET_DICE:
      return action.dice
    case TOGGLE_DIE:
      return action.dice
    case ROLL_DICE:
      return action.dice
    case PASS_DICE:
      return action.dice
    default:
      return state
  }
}
