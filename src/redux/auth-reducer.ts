import { AuthInitialState } from '../types/redux.types'
import { authAPI, captchaAPI } from '../api/api'
import { createAsyncThunk, createSlice, Dispatch } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit/dist/createAction'
import { RootState } from './store'

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: RootState
    dispatch: Dispatch<any>
    rejectValue: string
    extra: { s: string; n: number }
}>()

const initialState: AuthInitialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null,
    errorMessage: null,
    isSubmitting: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<{
            id: number | null, email: string | null, login: string | null, isAuth: boolean
        }>) => ({
            ...state,
            id: action.payload.id,
            email: action.payload.email,
            login: action.payload.login,
            isAuth: action.payload.isAuth
        }),
        setErrorMessage: (state, action: PayloadAction<string>) => ({
            ...state,
            errorMessage: action.payload
        }),
        setSubmitting: (state) => ({
            ...state,
            isSubmitting: !state.isSubmitting
        })
    },
    extraReducers: builder => {
        builder
            .addCase(getCaptchaUrl.fulfilled, (state, action: PayloadAction<string>) => ({
                ...state,
                captchaUrl: action.payload
            }))
    }
})

export const getCaptchaUrl = createAppAsyncThunk(
    'auth/getCaptchaUrl',
    async () => {
        const data = await captchaAPI.getCaptcha()
        const captchaUrl = data.url
        return captchaUrl
    }
)
export const getUserData = createAppAsyncThunk(
    'auth/getUserData',
    async (_, thunkAPI) => {
        const meData = await authAPI.me()
        if (meData.resultCode === 0) {
            const { id, email, login } = meData.data
            thunkAPI.dispatch(setUserData({ id, email, login, isAuth: true }))
        }
    }
)
export const logout = createAppAsyncThunk(
    'auth/logout',
    async (_, thunkAPI) => {
        const data = await authAPI.logout()
        if (data.resultCode === 0) thunkAPI.dispatch(setUserData({
            id: null, email: null, login: null, isAuth: false
        }))
    }
)
export const login = createAppAsyncThunk(
    'auth/login',
    async (payload: { email: string, password: string, rememberMe: boolean, captcha: string | null }, thunkAPI) => {
        thunkAPI.dispatch(setSubmitting())
        const { email, password, rememberMe, captcha } = payload
        const data = await authAPI.login(email, password, rememberMe, captcha)
        if (data.resultCode === 0) thunkAPI.dispatch(getUserData())
        else {
            if (data.resultCode === 10) thunkAPI.dispatch(getCaptchaUrl())
            const message = data.messages.length > 0 ? data.messages[0] : "Error"
            thunkAPI.dispatch(setErrorMessage(message))
        }
        thunkAPI.dispatch(setSubmitting())
    }
)

const { actions, reducer } = authSlice

export const { setUserData, setErrorMessage, setSubmitting } = actions

export default reducer

