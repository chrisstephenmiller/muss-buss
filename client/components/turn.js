import React from 'react'
import { connect } from 'react-redux'

const Turn = props => {

  const {fill, bust} = props.turn
  console.log(fill, bust)
  return (
    <div>
      <span style={{ fontSize: 24 }}>
      {`Fill: ${fill} - Bust: ${bust}`}
      </span>
    </div>
  )
}

const mapState = state => {
  const { game, turn } = state
  return { game, turn }
}

export default connect(mapState)(Turn)