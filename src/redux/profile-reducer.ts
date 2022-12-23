import { PayloadAction } from '@reduxjs/toolkit/dist/createAction'
import { createSlice } from '@reduxjs/toolkit/dist/createSlice'
import { Dispatch } from 'react'
import { profileAPI } from '../api/api'
import { Photos } from '../types/api.types'
import { InferActionsTypes, Profile, ProfileInitialState } from '../types/redux.types'

const initialState: ProfileInitialState = {
    profile: {
        userId: -1,
        lookingForAJob: false,
        lookingForAJobDescription: 'no',
        fullName: 'no',
        contacts: {
            github: 'no',
            vk: 'no',
            facebook: 'no',
            instagram: 'no',
            twitter: 'no',
            website: 'no',
            youtube: 'no',
            mainLink: 'no'
        },
        photos: {
            small: null,
            large: null
        },
        aboutMe: 'no',
    },
    status: null,
    isLoading: false
}



const profileReducer = (state = initialState, action: Action): ProfileInitialState => {
    switch (action.type) {
        case 'SET_PROFILE':
            return {
                ...state,
                profile: action.profile
            }
        case 'SET_STATUS':
            return {
                ...state,
                status: action.status
            }
        case 'SET_PHOTO':
            return {
                ...state,
                profile: { ...state.profile, photos: action.photo } as Profile
            }
        case 'SET_LOADING':
            return {
                ...state,
                isLoading: action.isLoading
            }
        default:
            return state
    }
}

export const profileActions = {
    setProfile: (profile: Profile) => ({ type: 'SET_PROFILE', profile } as const),
    setStatus: (status: string | null) => ({ type: 'SET_STATUS', status } as const),
    setPhoto: (photo: Photos) => ({ type: 'SET_PHOTO', photo } as const),
    setLoading: (isLoading: boolean) => ({type: 'SET_LOADING', isLoading} as const)
}

export const getProfileAndStatus = (userId: number | null) => async (dispatch: any) => {
    dispatch(profileActions.setLoading(true))
    const profile = await dispatch(getProfile(userId))
    const status = await dispatch(getStatus(userId))
    Promise.all([profile, status]).then(
        dispatch(profileActions.setLoading(false))
    )
}
export const getProfile = (userId: number | null) => async (dispatch: Dispatch<Action>) => {
    const data = await profileAPI.getProfile(userId)
    dispatch(profileActions.setProfile(data))
}
export const getStatus = (userId: number | null) => async (dispatch: Dispatch<Action>) => {
    const data = await profileAPI.getStatus(userId)
    dispatch(profileActions.setStatus(data))
}
export const updateStatus = (status: string | null) => async (dispatch: Dispatch<Action>) => {
    const data = await profileAPI.updateStatus(status)
    if (data.resultCode === 0) dispatch(profileActions.setStatus(status))
}
export const updateProfile = (profile: Profile) => async (dispatch: Dispatch<Action>) => {
    const data = await profileAPI.updateProfile(profile)
    if (data.resultCode === 0) dispatch(profileActions.setProfile(profile))
}
export const updatePhoto = (photoFile: File) => async (dispatch: Dispatch<Action>) => {
    const data = await profileAPI.updatePhoto(photoFile)
    if (data.resultCode === 0) dispatch(profileActions.setPhoto(data.data))
}

export default profileReducer

type Action = InferActionsTypes<typeof profileActions>