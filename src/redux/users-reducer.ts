import { Dispatch } from 'react'
import { usersAPI } from '../api/api'
import { InferActionsTypes, Users, UsersInitialState } from '../types/redux.types'

const initialState: UsersInitialState = {
    users: [],
    totalCount: 0,
    following: [],
    isSubmitting: false
}

const usersReducer = (state = initialState, action: Action): UsersInitialState => {
    switch (action.type) {
        case 'SET_USERS':
            return {
                ...state,
                users: [...state.users, ...action.users]
            }
        case 'SET_TOTAL_COUNT':
            return {
                ...state,
                totalCount: action.totalCount
            }
        case 'FOLLOW': 
            return {
                ...state,
                users: state.users.map(el => {
                    if (el.id === action.userId) {
                        return { ...el, followed: true }
                    }
                    return el
                })
            }
        case 'UNFOLLOW': 
            return {
                ...state,
                users: state.users.map(el => {
                    if (el.id === action.userId) return {...el, followed: false}
                    return el
                })
            }
        case 'FOLLOWING_ADD':
            return {
                ...state,
                following: [...state.following, action.userId]
            }
        case 'FOLLOWING_DELETE':
            return {
                ...state,
                following: state.following.filter(id => id != action.userId)
            }
        case 'SET_SUBMITTING':
            return {
                ...state,
                isSubmitting: !state.isSubmitting
            }
        case 'NULL_USERS':
            return {
                ...state,
                users: [],
                totalCount: 0
            }
        default:
            return state
    }
}

export const usersActions = {
    setUsers: (users: Users) => ({ type: 'SET_USERS', users } as const),
    setTotalCount: (totalCount: number) => ({ type: 'SET_TOTAL_COUNT', totalCount } as const),
    followSuccess: (userId: number) => ({ type: 'FOLLOW', userId } as const),
    unfollowSuccess: (userId: number) => ({type: 'UNFOLLOW', userId} as const),
    followingAdd: (userId: number) => ({type: 'FOLLOWING_ADD', userId} as const),
    followingDelete: (userId: number) => ({type: 'FOLLOWING_DELETE', userId} as const),
    setSubmitting: () => ({type: 'SET_SUBMITTING'} as const),
    nullUsers: () => ({type: 'NULL_USERS'} as const)
}

export const requestFriends = (page: number, pageSize: number) => 
    async (dispatch:  Dispatch<Action>) => {
        dispatch(usersActions.setSubmitting())
        const data = await usersAPI.users(page, pageSize, '', true)
        dispatch(usersActions.setUsers(data.items))
        dispatch(usersActions.setTotalCount(data.totalCount))
        dispatch(usersActions.setSubmitting())
}
export const requestUsers = (page: number, pageSize: number) => async (dispatch:  Dispatch<Action>) => {
    dispatch(usersActions.setSubmitting())
    const data = await usersAPI.users(page, pageSize)
    dispatch(usersActions.setUsers(data.items))
    dispatch(usersActions.setTotalCount(data.totalCount))
    dispatch(usersActions.setSubmitting())
}
export const follow = (userId: number) => async (dispatch: Dispatch<Action>) => {
    dispatch(usersActions.followingAdd(userId))
    const data = await usersAPI.follow(userId)
    if (data.resultCode === 0) dispatch(usersActions.followSuccess(userId))
    dispatch(usersActions.followingDelete(userId))
}
export const unfollow = (userId: number) => async (dispatch:  Dispatch<Action>) => {
    dispatch(usersActions.followingAdd(userId))
    const data = await usersAPI.unfollow(userId)
    if (data.resultCode === 0) dispatch(usersActions.unfollowSuccess(userId))
    dispatch(usersActions.followingDelete(userId))
}

export default usersReducer

type Action = InferActionsTypes<typeof usersActions>