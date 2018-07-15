import axios from 'axios'
import { newPlayersThunk, getPlayersThunk, newTurnThunk, getTurnThunk, newDiceThunk, getDiceThunk } from '../store'

const GET_GAME = `GET_GAME`
const NEXT_TURN = `NEXT_TURN`

const defaultGame = {}

export const getGame = game => ({ type: GET_GAME, game })
export const nextTurn = game => ({ type: NEXT_TURN, game })

export const newGame = (score, players) => async dispatch => {
  try {
    const res = await axios.post(`/api/games`, score)
    const game = res.data
    await dispatch(getGame(game || defaultGame))
    await dispatch(newPlayersThunk(game.id, players))
    await dispatch(newTurnThunk(game.id))
    await dispatch(newDiceThunk(game.id))
  } catch (err) {
    console.error(err)
  }
}

export const getGameThunk = gameId => async dispatch => {
  try {
    const res = await axios.get(`/api/games/${gameId}`)
    const game = res.data
    dispatch(getGame(game || defaultGame))
    dispatch(getPlayersThunk(game.id))
    dispatch(getTurnThunk(game.id))
    dispatch(getDiceThunk(game.id))
  } catch (err) {
    console.error(err)
  }
}

export default function (state = defaultGame, action) {
  switch (action.type) {
    case GET_GAME:
      return action.game
    case NEXT_TURN:
      return action.game
    default:
      return state
  }
}
