import React, { Component } from 'react'
import { connect } from 'react-redux'
import { newGameThunk, fetchUsers } from '../store';

class NewGame extends Component {

  constructor(props) {
    super(props)
    this.state = {
      winScore: 10000,
      numPlayers: 2,
      players: {}
    }
  }

  update = async event => {
    const { name } = event.target
    const value = +event.target.value
    const { players } = this.state
    if (name === `numPlayers`) {
      for (const player in players) if (player.slice(-1) >= value) delete players[player]
      this.setState({ numPlayers: value })
    }
    else if (name.slice(0, 6) === 'player') players[name] = value
    this.setState({ players })
    console.log(this.state.players)
  }

  submit = event => {
    event.preventDefault()
    const { newGame } = this.props
    const players = Object.values(this.state.players)
    if (players.length !== this.state.numPlayers) console.log('Not enough players.')
    else newGame(this.state.winScore, players)
  }

  componentDidMount = () => this.props.getUsers()

  render = () => {
    const { users } = this.props
    const { numPlayers } = this.state
    return (
      <div id='new-game' style={{ display: `flex` }}>
        <form name="game" onChange={this.update} onSubmit={this.submit}>
          <label>
            Points to win: <select name="score" defaultValue={this.state.winScore}>
              {[`5000`, `7500`, `10000`, `20000`].map(score => <option key={score} value={score}>{score}</option>)}
            </select>
          </label>
          <label>
            Number of players: <select name="numPlayers" defaultValue={this.state.numPlayers}>
              {[2, 3, 4, 5, 6, 7, 8].map(num => <option key={num} value={num}>{num}</option>)}
            </select>
          </label>
          {Array(numPlayers).fill().map((_, i) => {
            return (
              <label key={`player-${i}`}>
                Player: <select name={`player-${i}`} defaultValue='Choose player...' >
                  <option disabled>Choose player...</option>
                  {users.map(user => {
                    const disabled = Object.values(this.state.players).includes(user.id)
                    return <option disabled={disabled} key={user.id} id={user.id} value={user.id}>{user.name}</option>
                  })}
                </select>
              </label>
            )
          })}
          <label>
            <input type="submit" value="Start game!" />
          </label>
        </form>
      </div>
    )
  }
}

const mapState = state => {
  const { users } = state
  return { users }
}

const mapDispatch = dispatch => {
  return {
    newGame: (winScore, players) => {
      dispatch(newGameThunk(winScore, players))
    },
    getUsers: () => {
      dispatch(fetchUsers())
    }
  }
}

export default connect(mapState, mapDispatch)(NewGame)
