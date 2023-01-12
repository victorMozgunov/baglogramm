import { Dispatch } from "react"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import {  RootState } from "../redux/store"

export const useAppDispatch: () => Dispatch<any> = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector