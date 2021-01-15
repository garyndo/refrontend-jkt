import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './app'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import allReducer from './reducers'

const globalState = createStore(allReducer)

globalState.subscribe(() => console.log("Global State:", globalState.getState()))

ReactDOM.render(
  <Provider store={globalState}>
    <App />
  </Provider>,
  document.getElementById('root')
)


