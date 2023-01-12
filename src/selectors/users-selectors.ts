import {RootState} from '../redux/store'

export const selectUsers= (state: RootState) => state.usersScreen.users
export const selectFollowing = (state: RootState) => state.usersScreen.following
export const selectIsSubmitting = (state: RootState) => state.usersScreen.isSubmitting
export const selectTotalCount = (state: RootState) => state.usersScreen.totalCount