import { FC, useEffect } from 'react'
import './App.sass'
import InitializationLoader from './components/commons/InitializationLoader'
import AccountScreen from './components/AccountScreen/AccountScreen'
import LoginScreen from './components/LoginScreen/LoginScreen'
import { initializationApp } from './redux/app-reducer'
import { selectIsInitialization } from './selectors/app-selectors'
import { selectIsAuth } from './selectors/auth-selectors'
import { useAppDispatch, useAppSelector } from './hooks/hooks'

const App:FC = () => {
  const isInitialization = useAppSelector(selectIsInitialization)
  const isAuth = useAppSelector(selectIsAuth)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initializationApp())
  }, [])

  if (!isInitialization) return <InitializationLoader/>

  if (isAuth) return <AccountScreen/>

  return <LoginScreen/>
}

export default App
