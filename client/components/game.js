import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Dice, Score, Scores, Card, Button, Draw } from '../components'
import { getGameThunk, rollDiceThunk, drawCardThunk, stopTurnThunk, passTurnThunk, holdDiceThunk } from '../store'
import socket from '../socket'

class Game extends Component {

  componentDidMount() {
    const { getGame, match, rollDice, holdDie, drawCard, stopTurn, passTurn } = this.props
    const gameId = match.params.id
    getGame(gameId)
    document.addEventListener('keydown', () => {
      switch (event.key) {
        case 'r': return rollDice(gameId)
        case 'h': return holdDie(gameId, 6)
        case 'd': return drawCard(gameId)
        case 's': return stopTurn(gameId)
        case 'p': return passTurn(gameId)
      }
    })
    socket.on('updateIn', () => getGame(gameId))
  }

  componentWillUnmount() {
    console.log('unmount')
  }

  render() {
    const { game, drawCard, rollDice, holdDie, stopTurn, passTurn, user, match } = this.props
    const { players, dice, card, currentPlayer, score, invalidActions, winner, turn, deckSize } = game
    const gameId = match.params.id
    const isCurrentPlayer = user.id === currentPlayer.id
    for (const a in invalidActions) invalidActions[a] = invalidActions[a] || isCurrentPlayer
    if (winner) setTimeout(() => alert(game.winner), 100)
    return (
      <div id="game">
        <div className='game-container'>
          <div className='section'>
              <div className='button-container'>
                <Button text={`[R]OLL`} onClickFunc={rollDice} invalidAction={invalidActions.invalidRoll} gameId={gameId} />
                <Button text={`[S]TOP`} onClickFunc={stopTurn} invalidAction={invalidActions.invalidStop} gameId={gameId} />
              </div>
              <Dice dice={dice} card={card} turn={turn} holdDie={holdDie} gameId={gameId} />
            <div className='cards-container'>
              <Draw deckSize={deckSize} drawCard={drawCard} invalidDraw={invalidActions.invalidDraw} gameId={gameId} />
              <Card turn={turn} deckSize={deckSize} card={card} gameId={gameId} />
            </div>
          </div>
          <div className='section'>
            <Score score={score} passTurn={passTurn} invalidPass={invalidActions.invalidPass} gameId={gameId} />
            <Scores players={players} currentPlayerId={currentPlayer.id || 0} />
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  const { game, user } = state
  return { game, user }
}

const mapDispatch = dispatch => {
  return {
    getGame: gameId => dispatch(getGameThunk(gameId)),
    drawCard: gameId => dispatch(drawCardThunk(gameId)),
    rollDice: gameId => dispatch(rollDiceThunk(gameId)),
    holdDie: (gameId, dieId) => dispatch(holdDiceThunk(gameId, dieId)),
    stopTurn: gameId => dispatch(stopTurnThunk(gameId)),
    passTurn: gameId => dispatch(passTurnThunk(gameId))
  }
}

export default withRouter(connect(mapState, mapDispatch)(Game))
