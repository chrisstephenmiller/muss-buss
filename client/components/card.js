import React from 'react'
import { connect } from 'react-redux'

const newCard = () => { console.log(`card`) }

const Card = (props) => {
  const { card } = props.turn
  return (
    <div style={{ display: `flex` }}>
      <span style={{ fontSize: 32, margin: `10px` }}
        onClick={newCard}>
        CARD
      </span>
    </div>
  )
}

const mapState = state => {
  const { turn } = state
  return { turn }
}

export default connect(mapState)(Card)
