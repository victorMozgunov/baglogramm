import { Dispatch, FC, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.sass'
import InitializationLoader from './components/commons/InitializationLoader'
import AccountScreen from './components/AccountScreen/AccountScreen'
import LoginScreen from './components/LoginScreen/LoginScreen'
import { initializationApp } from './redux/app-reducer'
import { selectIsInitialization } from './selectors/app-selectors'
import { selectIsAuth } from './selectors/auth-selectors'

const App:FC = () => {
  const isInitialization = useSelector(selectIsInitialization)
  const isAuth = useSelector(selectIsAuth)
  const dispatch: Dispatch<any> = useDispatch()

  useEffect(() => {
    dispatch(initializationApp())
  }, [])

  if (!isInitialization) return <InitializationLoader/>

  if (isAuth) return <AccountScreen/>

  return <LoginScreen/>
}

export default App
