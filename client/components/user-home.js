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
    const liveGames = games.sort((a, b) => b.id - a.id)
    return (
      <div id='user-home'>
        <h3>Welcome, {name}!</h3>
        <div id='user-games'>
          <Link to="/games/new">New Game</Link>
          {liveGames.map(liveGame => {
            const { game, id } = liveGame
            return (
              <p key={`game-${id}`}>
                <Link to={`/games/${id}`}>{`Game ${id} - ${game.players.map((player, i) => `${i === game.playerIndex ?`*`:''}${player.name}: ${player.score}`).join(', ')}`}</Link>
              </p>
            )
          })}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  const { user } = state
  return {
    name: user.name,
    games: user.games && user.games.filter(game => !game.game.winner)
  }
}

const mapDispatch = dispatch => {
  return {
    getUser: () => dispatch(me())
  }
}


export default connect(mapState, mapDispatch)(UserHome)

UserHome.propTypes = {
  name: PropTypes.string
}
