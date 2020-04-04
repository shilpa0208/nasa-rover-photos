import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import reducer from './store/reducers/reducer'
import thunkMiddleware from 'redux-thunk'


const logger = store => {
    return next => {
        return action => {
            // The logs here help provide extra debugging help, uncomment to get more details
            // console.log('[Middleware] Dispatching ', action)
            const result = next(action)
            // console.log('[Middleware] next state ', store.getState())
            return result
        }
    }
}

// An alternative way of debugging by using the chrome redux-debugging dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducer, composeEnhancers(applyMiddleware(logger, thunkMiddleware)))

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
