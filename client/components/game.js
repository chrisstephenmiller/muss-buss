import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Dice, Scores } from '../components'
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
    const gameId = match.params.id
    const { players, dice, card, currentPlayer, score} = game
    return (
      <div id="game">
        <Scores players={players} currentPlayer={currentPlayer.id || 0} />
        <Dice dice={dice} />
        <h1>{`${card.type || 'DRAW'} - ${card.bust ? 'BUST' : score}`} </h1>
        <div style={{ display: 'flex' }}>
          <h1 style={{ margin: '0 65px 0 0' }} onClick={() => rollDice(gameId)}>[R]OLL</h1>
          <h1 style={{ margin: '0 65px 0 0' }} onClick={() => holdAll(gameId)}>[H]OLD</h1>
          <h1 style={{ margin: '0 65px 0 0' }} onClick={() => drawCard(gameId)}>[D]RAW</h1>
          <h1 style={{ margin: '0 65px 0 0' }} onClick={() => stopTurn(gameId)}>[S]TOP</h1>
          <h1 style={{ margin: '0 65px 0 0' }} onClick={() => passTurn(gameId)}>[P]ASS</h1>
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
    holdAll: gameId => dispatch(holdDiceThunk(gameId)),
    rollDice: gameId => dispatch(rollDiceThunk(gameId)),
    drawCard: gameId => dispatch(drawCardThunk(gameId)),
    stopTurn: gameId => dispatch(stopTurnThunk(gameId)),
    passTurn: gameId => dispatch(passTurnThunk(gameId))
  }
}

export default withRouter(connect(mapState, mapDispatch)(Game))
