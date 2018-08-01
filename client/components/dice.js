import React from 'react'
import { connect } from 'react-redux'
import { Die } from '../components'
import { toggleDieThunk } from '../store'

const sortById = (dieA, dieB) => dieA.id - dieB.id

const Dice = props => {
  const { dice, toggleDie, turn, game, players, user } = props
  const currentPlayer = players.find(player => player.id === game.currentPlayer)
  // const permission = currentPlayer && currentPlayer.userId === user.id
  const permission = true
  return (
    <div style={{ display: `flex` }}>
      {dice.sort(sortById).map((die => {
        return <Die key={die.id}
          die={die}
          turn={turn}
          onClick={() => { if (permission) toggleDie(die) }} />
      }))}
    </div>
  )
}

const mapState = state => {
  const { dice, turn, game, players, user } = state
  return { dice, turn, game, players, user }
}

const mapDispatch = dispatch => {
  return {
    toggleDie: die => {
      if (die.pointer) {
        dispatch(toggleDieThunk(die))
      }
    },
  }
}

export default connect(mapState, mapDispatch)(Dice)
