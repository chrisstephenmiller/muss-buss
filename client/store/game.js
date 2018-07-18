import axios from 'axios'
import { newPlayersThunk, getPlayersThunk, newTurnThunk, getTurnThunk, newDiceThunk, getDiceThunk } from '../store'

const NEW_GAME = `NEW_GAME`
const GET_GAME = `GET_GAME`
const NEXT_TURN = `NEXT_TURN`

const defaultGame = {}

export const newGame = game => ({ type: NEW_GAME, game })
export const getGame = game => ({ type: GET_GAME, game })
export const nextPlayer = game => ({ type: NEXT_TURN, game })

export const newGameThunk = (winScore, players) => async dispatch => {
  try {
    const res = await axios.post(`/api/games`, winScore)
    const game = res.data
    await dispatch(newGame(game || defaultGame))
    await dispatch(newPlayersThunk(game.id, players))
    await dispatch(newTurnThunk(game.id))
    await dispatch(newDiceThunk(game.id))
    dispatch(firstTurnThunk(game.id))
  } catch (err) {
    console.error(err)
  }
}

export const firstTurnThunk = gameId => async dispatch => {
  try {
    const res = await axios.patch(`/api/games/${gameId}`,)
    dispatch(nextPlayer(res.data || defaultGame))
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

export const nextPlayerThunk = gameId => async dispatch => {
  try {
    const res = await axios.put(`/api/games/${gameId}`)
    dispatch(nextPlayer(res.data || defaultGame))
  } catch (err) {
    console.error(err)
  }
}

export default function (state = defaultGame, action) {
  switch (action.type) {
    case NEW_GAME:
      return action.game
    case GET_GAME:
      return action.game
    case NEXT_TURN:
      return action.game
    default:
      return state
  }
}
