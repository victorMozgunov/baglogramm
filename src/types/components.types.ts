import { Profile } from "./redux.types"

export type ProfileUserProps = {
    profile: Profile 
    status: string | null
    userId: string | undefined
    setIsEditMode: (x: boolean) => void
}
export type EditProfileProps = {
    profile: Profile 
    status: string | null
    setIsEditMode: (x: boolean) => void
}
export type DataForm = {
    name: string
    status: string | null
}