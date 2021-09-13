/*
  入口js
*/
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {BrowserRouter} from 'react-router-dom'
// import storageUtils from './utils/storageUtils'
// import memoryUtils from './utils/memoryUtils'
import store from './redux/store'
import { Provider } from 'react-redux'

// const user = storageUtils.getUser()
// memoryUtils.user = user

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
