import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Dice, PlayerScores, Card } from '../components'
import { getGameThunk, rollDiceThunk, drawCardThunk, stopTurnThunk, passTurnThunk, holdDiceThunk } from '../store'
import socket from '../socket'

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
    socket.on('updateIn', () => getGame(gameId))
  }

  render() {
    const { game, match, rollDice, drawCard, stopTurn, passTurn, holdAll, user } = this.props
    const { players, dice, card, currentPlayer, score, actions, winner } = game
    const gameId = match.params.id
    const isCurrentPlayer = user.id === currentPlayer.id
    if (winner) setTimeout(() => alert(game.winner), 100)
    card && console.log(card)
    return (
      <div id="game">
        <Card card={card} />
        <Dice dice={dice} />
        <h1>{`${card.type ? (card.bust ? 'BUST' : score) : 'DRAW'}`} </h1>
        <div style={{ display: 'flex' }}>
          <h1 className={`button ${actions.invalidDraw || !isCurrentPlayer ? '' : 'button-hot'}`} onClick={() => drawCard(gameId)}>[D]RAW</h1>
          <h1 className={`button ${actions.invalidRoll || !isCurrentPlayer ? '' : 'button-hot'}`} onClick={() => rollDice(gameId)}>[R]OLL</h1>
          <h1 className={`button ${actions.invalidHold || !isCurrentPlayer ? '' : 'button-hot'}`} onClick={() => holdAll(gameId)}>[H]OLD</h1>
          <h1 className={`button ${actions.invalidStop || !isCurrentPlayer ? '' : 'button-hot'}`} onClick={() => stopTurn(gameId)}>[S]TOP</h1>
          <h1 className={`button ${actions.invalidPass || !isCurrentPlayer ? '' : 'button-hot'}`} onClick={() => passTurn(gameId)}>[P]ASS</h1>
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
  const { game, user } = state
  return { game, user , user}
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
