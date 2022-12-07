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