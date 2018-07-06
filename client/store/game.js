import axios from 'axios'
import { newPlayers, fetchPlayers } from './players'
import { newTurn, fetchTurn } from './turn';

const GET_GAME = `GET_GAME`

const defaultGame = {}

export const getGame = game => ({ type: GET_GAME, game })

export const fetchGame = (gameId) => async dispatch => {
  try {
    const res = await axios.get(`/api/games/${gameId}`, gameId)
    const game = res.data
    dispatch(getGame(game || defaultGame))
    dispatch(fetchPlayers(game))
    dispatch(fetchTurn(game))
  } catch (err) {
    console.error(err)
  }
}

export const newGame = (winScore, players) => async dispatch => {
  try {
    const res = await axios.post(`/api/games`, winScore)
    const game = res.data
    await dispatch(getGame(game || defaultGame))
    await dispatch(newPlayers(game, players))
    await dispatch(newTurn(game))
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
