import { useRouter } from 'next/router'
import { useAuth } from '../util/useAuth'
import { useEffect } from 'react'

const RedirectToProfile = () => {
  const user = useAuth()
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
