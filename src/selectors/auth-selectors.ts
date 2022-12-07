import {AppStateType} from '../redux/store'
export const selectIsAuth = (state: AppStateType) => state.auth.isAuth
export const selectCaptchaUrl = (state: AppStateType) => state.auth.captchaUrl
export const selectErrorMessage = (state: AppStateType) => state.auth.errorMessage