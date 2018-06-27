import React from 'react'
import { connect } from 'react-redux'
import { Die } from '../components'

const Dice = props => {

  const { dice } = props
  return (
    <div style={{ display: `flex` }}>
      {dice.map((die => {
        return <Die key={die.id} die={die} />
      }))}
    </div>
  )
}

const mapState = state => {
  return { dice: state.dice }
}

export default connect(mapState)(Dice)