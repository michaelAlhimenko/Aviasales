import React from 'react'
import ReactDOM from 'react-dom/client'
import { applyMiddleware, createStore, compose } from 'redux'
import { Provider } from 'react-redux'
import { thunk } from 'redux-thunk'

// eslint-disable-next-line import/order
import reducer from './reducer'

import './index.css'
import App from './App/App'

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
