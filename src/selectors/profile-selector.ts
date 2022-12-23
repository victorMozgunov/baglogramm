import {AppStateType} from '../redux/store'

export const selectProfile = (state: AppStateType) => state.profileScreen.profile
export const selectStatus = (state: AppStateType) => state.profileScreen.status
export const selectIsLoading = (state: AppStateType) => state.profileScreen.isLoading