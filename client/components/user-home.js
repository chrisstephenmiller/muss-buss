import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { me } from '../store'

class UserHome extends Component {

  componentDidMount() {
    this.props.getUser()
  }

  render() {
    const { name, games } = this.props
    const liveGameIds = games.map(game => game.id).sort((a, b) => b - a)
    return (
      <div>
        <h3>Welcome, {name}!</h3>
        <Link to="/games/new">New Game</Link>
        {liveGameIds.map(gameId => {
          return (
            <p key={`game-${gameId}`}>
              <Link to={`/games/${gameId}`}>{`Game ${gameId}`}</Link>
            </p>
          )
        })}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  const { user } = state
  return {
    name: user.name,
    games: user.games.filter(game => !game.game.winner)
  }
}

const mapDispatch = dispatch => {
  return {
    getUser: () => dispatch(me())
  }
}


export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  name: PropTypes.string
}
