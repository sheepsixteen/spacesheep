import Router from 'next/router'
import { useEffect } from 'react'
import LoginScreen from 'screens/LoginScreen'

import useAuth from '../util/useAuth'

const Login = () => {
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      Router.push(`/${user.username}`)
    }
  }, [user])

  return <LoginScreen />
}

export default Login
