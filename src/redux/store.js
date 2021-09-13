/*
  redux最核心的管理对象store
*/
import reducer from './reducer/index'

import { createStore, applyMiddleware } from 'redux'

import { composeWithDevTools } from 'redux-devtools-extension'

import thunk from 'redux-thunk'

export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))