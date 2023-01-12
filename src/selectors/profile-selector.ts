import {RootState} from '../redux/store'

export const selectProfile = (state: RootState) => state.profileScreen.profile
export const selectStatus = (state: RootState) => state.profileScreen.status
export const selectIsLoading = (state: RootState) => state.profileScreen.isLoading