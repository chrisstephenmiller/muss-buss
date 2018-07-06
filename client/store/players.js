import axios from 'axios'

const GET_PLAYERS = `GET_PLAYERS`

const defaultPlayers = []

export const getPlayers = players => ({type: GET_PLAYERS, players})

export const fetchPlayers = game => async dispatch => {
  const gameId = game.id
  try {
    const res = await axios.get(`/api/games/${gameId}/players`)
    dispatch(getPlayers(res.data || defaultPlayers))
  } catch (err) {
    console.error(err)
  }
}

export const newPlayers = (game, players) => async dispatch => {
  const gameId = game.id
  try {
    const res = await axios.post(`/api/games/${gameId}/players`, players)
    dispatch(getPlayers(res.data || defaultPlayers))
  } catch (err) {
    console.error(err)
  }
}

export default function(state = defaultPlayers, action) {
  switch (action.type) {
    case GET_PLAYERS:
      return action.players
    default:
      return state
  }
}
