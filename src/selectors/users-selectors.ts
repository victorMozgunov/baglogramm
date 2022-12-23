import {AppStateType} from '../redux/store'

export const selectUsers= (state: AppStateType) => state.usersScreen.users
export const selectFollowing = (state: AppStateType) => state.usersScreen.following
export const selectIsSubmitting = (state: AppStateType) => state.usersScreen.isSubmitting
export const selectTotalCount = (state: AppStateType) => state.usersScreen.totalCount