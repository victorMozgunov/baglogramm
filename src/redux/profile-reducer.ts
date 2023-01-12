import { PayloadAction } from '@reduxjs/toolkit/dist/createAction'
import { createAsyncThunk, createSlice, Dispatch } from '@reduxjs/toolkit'
import { profileAPI } from '../api/api'
import { Photos } from '../types/api.types'
import { Profile, ProfileInitialState } from '../types/redux.types'
import { RootState } from './store'

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: RootState
    dispatch: Dispatch<any>
    rejectValue: string
    extra: { s: string; n: number }
}>()

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

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfile: (state, action: PayloadAction<Profile>) => ({ ...state, profile: action.payload }),
        setStatus: (state, action: PayloadAction<string | null>) => ({ ...state, status: action.payload }),
        setPhoto: (state, action: PayloadAction<Photos>) => ({
            ...state,
            profile: { ...state.profile, photos: action.payload }
        }),
        setLoading: (state, action: PayloadAction<boolean>) => ({ ...state, isLoading: action.payload })
    },
    extraReducers: builder => {
        builder
            .addCase(getProfileAndStatus.fulfilled, (state) => ({ ...state, isLoading: false }))
    }
})

export const getProfileAndStatus = createAppAsyncThunk(
    'profile/getProfileAndStatus',
    async (userId: number | null, thunkAPI) => {
        thunkAPI.dispatch(setLoading(true))
        const profile = await profileAPI.getProfile(userId)
        thunkAPI.dispatch(setProfile(profile))
        const status = await profileAPI.getStatus(userId)
        thunkAPI.dispatch(setStatus(status))
    }
)
export const getProfile = createAppAsyncThunk(
    'profile/getProfile',
    async (userId: number | null, thunkAPI) => {
        const data = await profileAPI.getProfile(userId)
        thunkAPI.dispatch(setProfile(data))
    }
)
export const getStatus = createAppAsyncThunk(
    'profile/getStatus',
    async (userId: number | null, thunkAPI) => {
        const data = await profileAPI.getStatus(userId)
        thunkAPI.dispatch(setStatus(data))
    }
)
export const updateStatus = createAppAsyncThunk(
    'profile/updateStatus',
    async (status: string | null, thunkAPI) => {
        const data = await profileAPI.updateStatus(status)
        if (data.resultCode === 0) thunkAPI.dispatch(setStatus(status))
    }
)
export const updateProfile = createAppAsyncThunk(
    'profile/updateProfile',
    async (profile: Profile, thunkAPI) => {
        const data = await profileAPI.updateProfile(profile)
        if (data.resultCode === 0) thunkAPI.dispatch(setProfile(profile))
    }
)
export const updatePhoto = createAppAsyncThunk(
    'profile/updatePhoto',
    async (photoFile: File, thunkAPI) => {
        const data = await profileAPI.updatePhoto(photoFile)
        if (data.resultCode === 0) thunkAPI.dispatch(setPhoto(data.data))
    }
)

const { actions, reducer } = profileSlice

const { setProfile, setStatus, setPhoto, setLoading } = actions

export default reducer