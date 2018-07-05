import React, { Component } from 'react'
import { connect } from 'react-redux'
import { newGame } from '../store';

class NewGame extends Component {

  constructor() {
    super()

    this.state = {
      numPlayers: [1,2]
    }
  }

  numNames = (event) => {
    const num = event.target.value
    const numPlayers = []
    for (let i = 0; i < num; i++) { numPlayers.push(i) }
    this.setState({ numPlayers })
  }

  render() {
    const { startGame } = this.props
    return (
      <div style={{ display: `flex` }}>
        <form name="numPlayers">
          <label>
            How many players? <select onChange={this.numNames}>
              {[2,3,4,5,6,7,8].map(num => <option key={num} value={num}>{num}</option>)}
            </select>
          </label>
          {this.state.numPlayers.map(num => {
            return (
              <label key={num} style={{ whiteSpace: `pre` }}>
                Name: <input type="text" name="name" />
              </label>
            )
          })}
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}


const mapState = state => {
  const { dice, game } = state
  return { dice, game }
}

const mapDispatch = dispatch => {
  return {
    startGame: async () => {
      await dispatch(newGame())
    }
  }
}

export default connect(mapState, mapDispatch)(NewGame)