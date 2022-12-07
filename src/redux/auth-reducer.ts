import { AuthInitialState, InferActionsTypes } from '../types/redux.types'
import { authAPI, captchaAPI } from '../api/api'
import { Dispatch } from 'redux'

const initialState:AuthInitialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null,
    errorMessage: null
}

const authReducer = (state = initialState, action: Action): AuthInitialState => {
    switch (action.type) {
        case 'SET_USER_DATA':
            return {
                ...state,
                ...action.data
            }
        case 'SET_CAPTCHA_URL':
            return {
                ...state,
                captchaUrl: action.captchaUrl
            }
        case 'SET_ERROR_MESSAGE':
            return {
                ...state,
                errorMessage: action.errorMessage
            }
        default:
            return state
    }
}

export const authActions = {
    setUserData: (id: number, email: string, login: string, isAuth: boolean) =>
                        ({ type: 'SET_USER_DATA', data: { id, email, login, isAuth } } as const),
    setCaptchaUrl: (captchaUrl: string) => ({type: 'SET_CAPTCHA_URL', captchaUrl} as const),
    setErrorMessage: (errorMessage: string) => ({type: 'SET_ERROR_MESSAGE', errorMessage} as const)
}

export const getCaptchaUrl = () => async (dispatch: any) => {
    const data = await captchaAPI.getCaptcha()
    const captchaUrl = data.url
    dispatch(authActions.setCaptchaUrl(captchaUrl))
}
export const getUserData = () => async (dispatch: Dispatch<Action>) => {
    const meData = await authAPI.me()
    if (meData.resultCode === 0) {
        const { id, email, login } = meData.data
        dispatch(authActions.setUserData(id, email, login, true))
    }
}
export const login = (email: string, password: string, rememberMe: boolean, captcha: string | null) => 
                        async (dispatch: any) => {
    const data = await authAPI.login(email, password, rememberMe, captcha)
    if (data.resultCode === 0) dispatch(getUserData())
    else {
        if (data.resultCode === 10) dispatch(getCaptchaUrl())
        const message = data.messages.length > 0 ? data.messages[0] : "Error"
        dispatch(authActions.setErrorMessage(message))
    }
}

export default authReducer

type Action = InferActionsTypes<typeof authActions>