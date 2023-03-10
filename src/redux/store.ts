import appReducer from './app-reducer'
import authReducer from './auth-reducer'
import profileReducer from './profile-reducer'
import usersReducer from './users-reducer'
import { configureStore } from '@reduxjs/toolkit'

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

const store = configureStore({
    reducer: {
        auth: authReducer,
        appScreen: appReducer,
        usersScreen: usersReducer,
        profileScreen: profileReducer
    }
})

export default store