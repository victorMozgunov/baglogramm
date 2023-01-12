import {RootState} from '../redux/store'

export const selectIsAuth = (state: RootState) => state.auth.isAuth
export const selectCaptchaUrl = (state: RootState) => state.auth.captchaUrl
export const selectErrorMessage = (state: RootState) => state.auth.errorMessage
export const selectIsSubmitting = (state: RootState) => state.auth.isSubmitting
export const selectId = (state: RootState) => state.auth.id