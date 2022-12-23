import { Contacts, Photos } from "./api.types"

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
    isSubmitting: boolean
}
export type UsersInitialState = {
    totalCount: number
    users: Users
    following: Array<number>
    isSubmitting: boolean
}
export type Users = Array<{
    id: number
    name: string
    status: string
    photos: {
        small: string | null
        large: string | null
    }
    followed: boolean
}>
export type Profile = {
    userId: number 
    lookingForAJob: boolean 
    lookingForAJobDescription: string 
    fullName: string 
    contacts: Contacts 
    photos: Photos
    aboutMe: string 
}
export type ProfileInitialState = {
    profile: Profile
    status: string | null
    isLoading: boolean
}


export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never