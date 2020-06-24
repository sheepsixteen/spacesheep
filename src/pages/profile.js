import { useRouter } from 'next/router'
import { useEffect } from 'react'

import useAuth from '../util/useAuth'

const RedirectToProfile = () => {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push(`/${user.username}`)
    } else {
      router.push('/signup')
    }
  }, [user])

  return null
}

export default RedirectToProfile
