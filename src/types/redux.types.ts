export type AppInitialState = {
    isInitialization: boolean
}
export type AuthInitialState = {
    id: null | number
    email: null | string
    login: null | string
    isAuth: boolean
    captchaUrl: null | string
    errorMessage: null | string
}

export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never