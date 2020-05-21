import Router from 'next/router'
import { useEffect } from 'react'
import { useAuth } from '../util/useAuth'
import LoginScreen from 'screens/LoginScreen'

const Login = () => {
  const user = useAuth()

  useEffect(() => {
    if (user) {
      Router.push(`/${user.username}`)
    }
  }, [user])

  return <LoginScreen />
}

export default Login
