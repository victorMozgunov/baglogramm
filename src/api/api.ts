import axios from 'axios'
import {MeResponse, LoginResponse, 
    LogoutResponse, GetCaptchaResponse} from '../types/api.types'

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