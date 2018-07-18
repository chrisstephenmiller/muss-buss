import React, { Component } from 'react'
import { connect } from 'react-redux'
import { newGameThunk } from '../store';

class NewGame extends Component {

  constructor() {
    super()

    this.state = {
      winScore: 10000,
      numPlayers: [1, 2, 3, 4],
      name1: `Player 1`,
      name2: `Player 2`,
      name3: `Player 3`,
      name4: `Player 4`,
    }
  }

  update = event => {
    const { name, value } = event.target
    if (name === `numPlayers`) {
      const numPlayers = []
      for (let i = 1; i <= value; i++) {
        numPlayers.push(i)
        if (!this.state[`name${i}`]) (this.setState({ [`name${i}`]: `Player ${i}` }))
      }
      for (const key in this.state) { if (key.slice(4) > value) delete this.state[key] }
      this.setState({ numPlayers })
    } else {
      this.setState({ [name]: value })
    }
  }

  submit = event => {
    event.preventDefault()
    const { newGame } = this.props
    const players = []
    for (const key in this.state) { if (key.slice(0, 4) === `name`) players.push(this.state[key]) }
    newGame(this.state.winScore, players)
  }

  componentDidUpdate = () => {
    const { game, dice, history } = this.props
    if (dice.length) history.push(`/games/${game.id}`)
  }

  render = () => {
    return (
      <div style={{ display: `flex` }}>
        <form name="players" onChange={this.update} onSubmit={this.submit}>
          <label>
            Points to win: <select name="score" defaultValue="10000">
              {[`5000`, `7500`, `10000`, `20000`].map(score => <option key={score} value={score}>{score}</option>)}
            </select>
          </label>
          <label>
            Number of players: <select name="numPlayers" defaultValue="4">
              {[2, 3, 4, 5, 6, 7, 8].map(num => <option key={num} value={num}>{num}</option>)}
            </select>
          </label>
          {this.state.numPlayers.map(num => {
            return (
              <label key={`name${num}`}>
                Name: <input type="text" name={`name${num}`} placeholder={`Player ${num}`} />
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
  const { game, dice } = state
  return { game, dice }
}

const mapDispatch = dispatch => {
  return {
    newGame: (winScore, players) => {
      dispatch(newGameThunk(winScore, players))
    },
  }
}

export default connect(mapState, mapDispatch)(NewGame)
