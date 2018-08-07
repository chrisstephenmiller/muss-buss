import React from 'react'
import { connect } from 'react-redux'

const newCard = () => { console.log(`card`) }

const Card = (props) => {
  const { card } = props
  return (
    <div style={{ display: `flex` }}>
      <span style={{ fontSize: 32, margin: `10px` }}
        onClick={newCard}>
        {`CARD: ${card}`}
      </span>
    </div>
  )
}

const mapState = state => {
  const { card } = state
  return { card }
}

export default connect(mapState)(Card)
