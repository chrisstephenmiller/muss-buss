import React, { Component } from 'react'
import { connect } from 'react-redux'
import { newGameThunk, fetchUsers } from '../store';

class NewGame extends Component {

  constructor() {
    super()

    this.state = {
      winScore: 10000,
      numPlayers: [1, 2, 3, 4, 5],
      players: ['lee', 'susan', 'peter', 'chris', 'john']
    }
  }

  update = async event => {
    const { name, childNodes } = event.target
    const value = +event.target.value
    if (name === `numPlayers`) {
      const numPlayers = []
      for (let i = 1; i <= value; i++) {
        numPlayers.push(i)
        if (!this.state[`user${i}`]) (this.setState({ [`user${i}`]: `` }))
      }
      for (const key in this.state) { if (key.slice(4) > value) delete this.state[key] }
      this.setState({ numPlayers })
    } else {
      const { id, text } = childNodes[value - 1]
      await this.setState({ [`${name}${id}`]: { email: text, id: value } })
    }
  }

  submit = event => {
    event.preventDefault()
    const { newGame } = this.props
    const players = []
    for (const key in this.state) { 
      if (key.slice(0, 4) === `Players`) players.push(this.state[key]) 
    }
    newGame(1000, [{name: 'peter'}, {name: 'chris'}, {name: 'john'}])
  }

  componentDidMount = () => {
    this.props.getUsers()
  }

  render = () => {
    const { users } = this.props
    return (
      <div style={{ display: `flex` }}>
        <form name="game" onChange={this.update} onSubmit={this.submit}>
          <label>
            Points to win: <select name="score" defaultValue="10000">
              {[`5000`, `7500`, `10000`, `20000`].map(score => <option key={score} value={score}>{score}</option>)}
            </select>
          </label>
          <label>
            Number of players: <select name="numPlayers" defaultValue="5">
              {[2, 3, 4, 5, 6, 7, 8].map(num => <option key={num} value={num}>{num}</option>)}
            </select>
          </label>
          {this.state.numPlayers.map(num => {
            return (
              <label key={num}>
                Player: <select name="user">
                  {users.map(user => <option key={user.id} id={num} value={user.id}>{user.name}</option>)}
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
