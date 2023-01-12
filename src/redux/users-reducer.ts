import { createAsyncThunk, createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { usersAPI } from '../api/api'
import { Users, UsersInitialState } from '../types/redux.types'
import { RootState } from './store'

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: RootState
    dispatch: Dispatch<any>
    rejectValue: string
    extra: { s: string; n: number }
}>()

const initialState: UsersInitialState = {
    users: [],
    totalCount: 0,
    following: [],
    isSubmitting: false
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<Users>) => ({
            ...state,
            users: [...state.users, ...action.payload]
        }),
        setTotalCount: (state, action: PayloadAction<number>) => ({
            ...state,
            totalCount: action.payload
        }),
        setFollow: (state, action: PayloadAction<number>) => ({
            ...state,
            users: state.users.map(el => {
                if (el.id === action.payload) {
                    return { ...el, followed: true }
                }
                return el
            })
        }),
        setUnfollow: (state, action: PayloadAction<number>) => ({
            ...state,
            users: state.users.map(el => {
                if (el.id === action.payload) return { ...el, followed: false }
                return el
            })
        }),
        followingAdd: (state, action: PayloadAction<number>) => ({
            ...state,
            following: [...state.following, action.payload]
        }),
        followingDelete: (state, action: PayloadAction<number>) => ({
            ...state,
            following: state.following.filter(id => id != action.payload)
        }),
        setSubmitting: (state) => ({
            ...state,
            isSubmitting: !state.isSubmitting
        }),
        setNullUsers: (state) => ({
            ...state,
            users: [],
            totalCount: 0
        }),
    },
    extraReducers: builder => {
        builder
            .addCase(setDeleteFriend.fulfilled, (state, action: PayloadAction<number>) => ({
                ...state,
                users: state.users.filter(el => el.id !== action.payload)
            }))
    }
})

export const requestUsers = createAppAsyncThunk(
    'users/requestFriends',
    async (payload: { page: number, pageSize: number, friends: boolean | null }, thunkAPI) => {
        thunkAPI.dispatch(setSubmitting())
        const data = await usersAPI.users(payload.page, payload.pageSize, '', payload.friends)
        thunkAPI.dispatch(setUsers(data.items))
        thunkAPI.dispatch(setTotalCount(data.totalCount))
        thunkAPI.dispatch(setSubmitting())
    }
)
export const follow = createAppAsyncThunk(
    'users/follow',
    async (userId: number, thunkAPI) => {
        thunkAPI.dispatch(followingAdd(userId))
        const data = await usersAPI.follow(userId)
        if (data.resultCode === 0) thunkAPI.dispatch(setFollow(userId))
        thunkAPI.dispatch(followingDelete(userId))
    }
)
export const unfollow = createAppAsyncThunk(
    'users/unfollow',
    async (userId: number, thunkAPI) => {
        thunkAPI.dispatch(followingAdd(userId))
        const data = await usersAPI.unfollow(userId)
        if (data.resultCode === 0) thunkAPI.dispatch(setUnfollow(userId))
        thunkAPI.dispatch(followingDelete(userId))
    }
)
export const setDeleteFriend = createAppAsyncThunk(
    'users/setDeleteFriend',
    async (userId: number, thunkAPI) => {
        thunkAPI.dispatch(unfollow(userId))
        return userId
    }
)

const { actions, reducer } = usersSlice

export const { setUsers, setSubmitting, setTotalCount, followingAdd,
    followingDelete, setFollow, setUnfollow, setNullUsers } = actions

export default reducer
