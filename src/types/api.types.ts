export type MeResponse = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: number
    messages: Array<string>
}
export type LoginResponse = {
    resultCode: number
    messages: Array<string>
    data: {
        userId: number
    }
}
export type LogoutResponse = {
    resultCode: number
    messages: Array<string>
    data: {}
}
export type GetCaptchaResponse = {
    url: string
}
export type UsersResponse = {
    totalCount: number
    error: string | null
    items: Array<{
        id: number
        name: string
        status: string
        photos: {
            small: string | null
            large: string | null
        }
        followed: boolean
    }>
}
export type FollowResponse = {
    resultCode: number
    messages: Array<string>
    data: {}
}
export type UnfollowResponse = {
    resultCode: number
    messages: Array<string>
    data: {}
}
export type Contacts = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type Photos = {
    small: string | null
    large: string | null
}
export type ProfileResponse = {
    userId: number 
    lookingForAJob: boolean 
    lookingForAJobDescription: string 
    fullName: string 
    contacts: Contacts 
    photos: Photos 
    aboutMe: string 
}
export type UpdateStatusResponse = {
    data: {}
    messages: Array<string>
    resultCode: number
}
export type UpdatePhotosResponse = {
    data: Photos
    messages: Array<string>
    resultCode: number
}
