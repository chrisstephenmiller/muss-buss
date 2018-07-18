import axios from 'axios'

const NEW_PLAYERS = `NEW_PLAYERS`
const GET_PLAYERS = `GET_PLAYERS`
const SCORE_PLAYERS = `SCORE_PLAYERS`

const defaultPlayers = []

export const newPlayers = players => ({type: NEW_PLAYERS, players})
export const getPlayers = players => ({type: GET_PLAYERS, players})
export const scorePlayers = players => ({type: SCORE_PLAYERS, players})

export const newPlayersThunk = (gameId, players) => async dispatch => {
  try {
    const res = await axios.post(`/api/games/${gameId}/players`, players)
    dispatch(newPlayers(res.data || defaultPlayers))
  } catch (err) {
    console.error(err)
  }
}

export const getPlayersThunk = gameId => async dispatch => {
  try {
    const res = await axios.get(`/api/games/${gameId}/players`)
    dispatch(getPlayers(res.data || defaultPlayers))
  } catch (err) {
    console.error(err)
  }
}

export const scorePlayersThunk = gameId => async dispatch => {
  try {
    const res = await axios.put(`/api/games/${gameId}/players`)
    dispatch(scorePlayers(res.data || defaultPlayers))
  } catch (err) {
    console.error(err)
  }
}

export default function(state = defaultPlayers, action) {
  switch (action.type) {
    case NEW_PLAYERS:
      return action.players
    case GET_PLAYERS:
      return action.players
    case SCORE_PLAYERS:
      return action.players
    default:
      return state
  }
}
