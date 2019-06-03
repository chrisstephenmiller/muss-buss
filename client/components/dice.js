import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Die } from '../components'
import { holdDiceThunk } from '../store';

const emptyDice = [
  { "id": 0, "held": false, "live": true, "value": 0, "pointer": false },
  { "id": 1, "held": false, "live": true, "value": 0, "pointer": false },
  { "id": 2, "held": false, "live": true, "value": 0, "pointer": false },
  { "id": 3, "held": false, "live": true, "value": 0, "pointer": false },
  { "id": 4, "held": false, "live": true, "value": 0, "pointer": false },
  { "id": 5, "held": false, "live": true, "value": 0, "pointer": false }]

const Dice = props => {
  const { holdDice, dice, match } = props
  const gameId = match.params.id
  const allDice = dice.length ? dice : emptyDice
  return (
    <div style={{ display: `flex` }}>
      {allDice.map((die => {
        return <Die key={die.id}
          holdDice={() => holdDice(gameId, die.id)}
          die={die} />
      }))}
    </div>
  )
}

const mapState = state => {
  const { game } = state
  return { game }
}

const mapDispatch = dispatch => {
  return {
    holdDice: (gameId, dieId) => {
      dispatch(holdDiceThunk(gameId, dieId))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Dice))
