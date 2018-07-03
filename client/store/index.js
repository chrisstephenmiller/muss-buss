import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import dice from './dice'
import game from './game'
import turn from './turn'
import players from './players'

const reducer = combineReducers({user, dice, game, players, turn})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './dice'
export * from './game'
export * from './players'
export * from './turn'
