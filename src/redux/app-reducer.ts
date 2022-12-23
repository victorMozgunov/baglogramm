import { AppInitialState, InferActionsTypes } from '../types/redux.types'
import { getUserData } from './auth-reducer'

const initialState:AppInitialState = {
    isInitialization: false
}

const appReducer = (state = initialState, action: Action):AppInitialState => {
    switch (action.type) {
        case 'INITIALIZATION_SUCCESS':
            return {
                ...state,
                isInitialization: true
            }
        default:
            return state
    }
}

export const appActions = {
    initialization: () => ({type: 'INITIALIZATION_SUCCESS'} as const)
}

export const initializationApp = () => async (dispatch: any) => {
    const promise = await dispatch(getUserData())
    Promise.all([promise]).then(
        dispatch(appActions.initialization())
    )
}

export default appReducer

type Action = InferActionsTypes<typeof appActions>