import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'

import {authReducer} from '../reducers/authReducer'
import { rolReducer } from '../reducers/rolReducer'
import { teachersReducer } from '../reducers/teachersReducer'
import {uiReducer} from '../reducers/uiReducer'

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    rol: rolReducer,
    teachers: teachersReducer
})

export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))