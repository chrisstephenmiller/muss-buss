import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, games} = props  
  // games.forEach(game => {
  //   console.log(game.id)
  // })
  return (
    <div>
      <h3>Welcome, {email}</h3>
      <Link to="/games/new">New Game</Link>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  const { user } = state
  return {
    email: user.email,
    games: user
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
