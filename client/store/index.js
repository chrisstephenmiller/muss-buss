import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import game from './game'
import turn from './turn'
import dice from './dice'
import players from './players'

const reducer = combineReducers({ user, game, players, turn, dice})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './game'
export * from './dice'
export * from './players'
export * from './turn'
