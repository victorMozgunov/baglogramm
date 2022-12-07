import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'
import appReducer from './app-reducer'
import authReducer from './auth-reducer'

const rootReducer = combineReducers({
    auth: authReducer,
    appScreen: appReducer
})

export type AppStateType = ReturnType<typeof rootReducer>

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))


export default store