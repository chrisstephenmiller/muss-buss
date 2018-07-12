import axios from 'axios'
import { fetchPlayers } from './players';
import { nextPlayer } from './game';
import { passDice } from './dice';

const GET_TURN = `GET_TURN`

const defaultTurn = {}

export const getTurn = turn => ({ type: GET_TURN, turn })

export const fetchTurn = gameId => async dispatch => {
  try {
    const res = await axios.get(`/api/games/${gameId}/turn`)
    dispatch(getTurn(res.data || defaultTurn))
  } catch (err) {
    console.error(err)
  }
}

export const newTurn = gameId => async dispatch => {
  try {
    const res = await axios.post(`/api/games/${gameId}/turn`)
    dispatch(getTurn(res.data || defaultTurn))
  } catch (err) {
    console.error(err)
  }
}

export const endTurn = gameId => async dispatch => {
  try {
    const res = await axios.delete(`/api/games/${gameId}/turn`)
    dispatch(getTurn(res.data || defaultTurn))
    dispatch(passDice(gameId)) 
    dispatch(nextPlayer(gameId))
    dispatch(fetchPlayers(gameId))
  } catch (err) {
    console.error(err)
  }
}

export const rollTurn = (gameId, die) => async dispatch => {
  try {
    const res = await axios.put(`/api/games/${gameId}/turn`, die)
    dispatch(res.data.bust ? endTurn(gameId) : getTurn(res.data || defaultTurn))
  } catch (err) {
    console.error(err)
  }
}

export default function (state = defaultTurn, action) {
  switch (action.type) {
    case GET_TURN:
      return action.turn
    default:
      return state
  }
}
