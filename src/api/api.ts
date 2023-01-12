import axios from 'axios'
import {MeResponse, LoginResponse, 
    LogoutResponse, GetCaptchaResponse, UsersResponse, FollowResponse, UnfollowResponse, ProfileResponse, UpdateStatusResponse, UpdatePhotosResponse} from '../types/api.types'

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'ddf10421-acf3-425c-b9f2-4d016a652714'
    }
})

export const captchaAPI = {
    async getCaptcha() {
        const response = await instance.get<GetCaptchaResponse>(`/security/get-captcha-url`)
        return response.data
    }
}
export const authAPI = {
    async me() {
        const response = await instance.get<MeResponse>(`/auth/me`)
        return response.data
    },
    async login(email: string, password: string, rememberMe: boolean = false, captcha: null | string = null) {
        const response = await instance.post<LoginResponse>
                            (`/auth/login`, {email, password, rememberMe, captcha})
        return response.data
    },
    async logout() {
        const response = await instance.delete<LogoutResponse>(`/auth/login`)
        return response.data
    }
}
export const usersAPI = {
    async users(currentPage = 1, pageSize = 10, term: string = '', friend: null | boolean = null) {
        const response = await instance.get<UsersResponse>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`))
        return response.data
    },
    async follow(userId: number) {
        const response = await instance.post<FollowResponse>(`/follow/${userId}`)
        return response.data
    },
    async unfollow(userId: number) {
        const response = await instance.delete<UnfollowResponse>(`/follow/${userId}`)
        return response.data
    }
}
export const profileAPI = {
    async getProfile(userId: number | null) {
        const response = await instance.get<ProfileResponse>(`profile/` + userId)
        return response.data
    },
    async getStatus(userId: number | null) {
        const response = await instance.get<string>(`profile/status/` + userId)
        return response.data
    },
    async updateStatus(status: string | null) {
        const response = await instance.put<UpdateStatusResponse>(`profile/status`, { status: status })
        return response.data
    },
    async updateProfile(profile: ProfileResponse) {
        const response = await instance.put<UpdateStatusResponse>(`profile`, profile)
        return response.data
    },
    async updatePhoto(photoFile: File) {
        const formData = new FormData()
        formData.append('image', photoFile)
        const response = await instance.put<UpdatePhotosResponse>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }})
        return response.data
    }
}