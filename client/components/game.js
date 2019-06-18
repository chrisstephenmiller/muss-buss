import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Dice, PlayerScores } from '../components'
import { getGameThunk, rollDiceThunk, drawCardThunk, stopTurnThunk, passTurnThunk, holdDiceThunk } from '../store'

class Game extends Component {

  componentDidMount() {
    const { getGame, match, rollDice, holdAll, drawCard, stopTurn, passTurn } = this.props
    const gameId = match.params.id
    getGame(gameId)
    document.addEventListener('keydown', () => {
      switch (event.key) {
        case 'r': return rollDice(gameId)
        case 'h': return holdAll(gameId)
        case 'd': return drawCard(gameId)
        case 's': return stopTurn(gameId)
        case 'p': return passTurn(gameId)
      }
    })
  }

  render() {
    const { game, match, rollDice, drawCard, stopTurn, passTurn, holdAll } = this.props
    const { players, dice, card, currentPlayer, score, actions, winner } = game
    const gameId = match.params.id
    if (winner) setTimeout(() => alert(game.winner), 500)
    return (
      <div id="game">
        <Dice dice={dice} />
        <h1>{`${card.type || 'DRAW'} - ${card.bust ? 'BUST' : score}`} </h1>
        <div style={{ display: 'flex' }}>
          <h1 className={`button ${actions.invalidDraw ? '' : 'button-hot'}`} onClick={() => drawCard(gameId)}>[D]RAW</h1>
          <h1 className={`button ${actions.invalidRoll ? '' : 'button-hot'}`} onClick={() => rollDice(gameId)}>[R]OLL</h1>
          <h1 className={`button ${actions.invalidHold ? '' : 'button-hot'}`} onClick={() => holdAll(gameId)}>[H]OLD</h1>
          <h1 className={`button ${actions.invalidStop ? '' : 'button-hot'}`} onClick={() => stopTurn(gameId)}>[S]TOP</h1>
          <h1 className={`button ${actions.invalidPass ? '' : 'button-hot'}`} onClick={() => passTurn(gameId)}>[P]ASS</h1>
        </div>
        <div style={{display: 'flex'}}>
        {players.map((player, i) => <PlayerScores
          key={player.id}
          player={player}
          currentPlayerId={currentPlayer.id || 0}
        />)}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  const { game } = state
  return { game }
}

const mapDispatch = dispatch => {
  return {
    getGame: gameId => dispatch(getGameThunk(gameId)),
    holdAll: gameId => dispatch(holdDiceThunk(gameId, 6)),
    rollDice: gameId => dispatch(rollDiceThunk(gameId)),
    drawCard: gameId => dispatch(drawCardThunk(gameId)),
    stopTurn: gameId => dispatch(stopTurnThunk(gameId)),
    passTurn: gameId => dispatch(passTurnThunk(gameId))
  }
}

export default withRouter(connect(mapState, mapDispatch)(Game))
