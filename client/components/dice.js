import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Die } from '../components'
import { holdDiceThunk } from '../store';

const Dice = props => {
  const { holdDice, dice, match } = props
  const gameId = match.params.id
  return (
    <div style={{ display: `flex` }}>
      {dice.map((die => {
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
