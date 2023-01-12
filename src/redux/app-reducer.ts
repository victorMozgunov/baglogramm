import { createAsyncThunk, createSlice, Dispatch } from '@reduxjs/toolkit'
import { authAPI } from '../api/api'
import { AppInitialState } from '../types/redux.types'
import { setUserData } from './auth-reducer'
import { RootState } from './store'

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: RootState
    dispatch: Dispatch<any>
    rejectValue: string
    extra: { s: string; n: number }
}>()

const initialState:AppInitialState = {
    isInitialization: false
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        initialization: state => ({...state, isInitialization: true})
    }
})

export const initializationApp = createAppAsyncThunk(
    'app/initialization',
    async (_, thunkAPI) => {
        const meData = await authAPI.me()
        if (meData.resultCode === 0) {
            const { id, email, login } = meData.data
            thunkAPI.dispatch(setUserData({ id, email, login, isAuth: true }))
        }
        thunkAPI.dispatch(initialization())
    }
)

const {reducer, actions} = appSlice

export const {initialization} = actions

export default reducer

// const appReducer = (state = initialState, action: Action):AppInitialState => {
//     switch (action.type) {
//         case 'INITIALIZATION_SUCCESS':
//             return {
//                 ...state,
//                 isInitialization: true
//             }
//         default:
//             return state
//     }
// }

// export const appActions = {
//     initialization: () => ({type: 'INITIALIZATION_SUCCESS'} as const)
// }

// export const initializationApp = () => async (dispatch: any) => {
//     const promise = await dispatch(getUserData())
//     Promise.all([promise]).then(
//         dispatch(appActions.initialization())
//     )
// }

// export default appReducer
