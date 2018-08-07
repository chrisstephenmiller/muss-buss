import axios from 'axios'
import { me, newPlayersThunk, getPlayersThunk, newTurnThunk, getTurnThunk, newDiceThunk, getDiceThunk, newCardThunk, getCardThunk } from '../store'
import socket from '../socket'

const NEW_GAME = `NEW_GAME`
const GET_GAME = `GET_GAME`
const NEXT_TURN = `NEXT_TURN`

const defaultGame = {}

const gameUpdate = gameId => socket.emit(`updateOut`, gameId)

export const newGame = game => ({ type: NEW_GAME, game })
export const getGame = game => ({ type: GET_GAME, game })
export const nextTurn = game => ({ type: NEXT_TURN, game })

export const newGameThunk = (winScore, players) => async dispatch => {
  try {
    const res = await axios.post(`/api/games`, winScore)
    const game = res.data
    await dispatch(newGame(game || defaultGame))
    await dispatch(newCardThunk(game.id))
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
    dispatch(nextTurn(res.data || defaultGame))
  } catch (err) {
    console.error(err)
  }
}


export const getGameThunk = gameId => async dispatch => {
  try {
    const res = await axios.get(`/api/games/${gameId}`)
    const game = res.data
    dispatch(getGame(game || defaultGame))
    dispatch(getCardThunk(game.id))
    dispatch(getPlayersThunk(game.id))
    dispatch(getTurnThunk(game.id))
    dispatch(getDiceThunk(game.id))
    dispatch(me())
  } catch (err) {
    console.error(err)
  }
}

export const nextTurnThunk = gameId => async dispatch => {
  try {
    const res = await axios.put(`/api/games/${gameId}`)
    dispatch(nextTurn(res.data || defaultGame))
    gameUpdate()
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
