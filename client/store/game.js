import axios from 'axios'
import { newPlayers, fetchPlayers, newTurn, fetchTurn, newDice, fetchDice } from '../store'

const GET_GAME = `GET_GAME`

const defaultGame = {}

export const getGame = game => ({ type: GET_GAME, game })

export const fetchGame = gameId => async dispatch => {
  try {
    const res = await axios.get(`/api/games/${gameId}`)
    const game = res.data
    dispatch(getGame(game || defaultGame))
    dispatch(fetchPlayers(game.id))
    dispatch(fetchTurn(game.id))
    dispatch(fetchDice(game.id))
  } catch (err) {
    console.error(err)
  }
}

export const nextPlayer = gameId => async dispatch => {
  try {
    const res = await axios.put(`/api/games/${gameId}`)
    const game = res.data
    dispatch(getGame(game || defaultGame))
  } catch (err) {
    console.error(err)
  }
}

export const newGame = (winScore, players) => async dispatch => {
  try {
    const res = await axios.post(`/api/games`, winScore)
    const game = res.data
    await dispatch(getGame(game || defaultGame))
    await dispatch(newPlayers(game.id, players))
    await dispatch(newTurn(game.id))
    await dispatch(newDice(game.id))

  } catch (err) {
    console.error(err)
  }
}

export default function (state = defaultGame, action) {
  switch (action.type) {
    case GET_GAME:
      return action.game
    default:
      return state
  }
}
