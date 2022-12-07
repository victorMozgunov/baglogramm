import { Dispatch, FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import DialogsScreen from './components/DialogsScreen/DialogsScreen'
import LoginScreen from './components/LoginScreen/LoginScreen'
import { initializationApp } from './redux/app-reducer'
import { selectIsInitialization } from './selectors/app-selectors'
import { selectIsAuth } from './selectors/auth-selectors'

const App:FC = () => {
  const isAuth = useSelector(selectIsAuth)
  const isInitialization = useSelector(selectIsInitialization)
  const dispatch: Dispatch<any> = useDispatch()

  useEffect(() => {
    dispatch(initializationApp())
  }, [])

  if (!isInitialization) return <div>dog</div>
  if (isAuth) return <DialogsScreen />
  return <LoginScreen />
}

export default App
