import { useRouter } from 'next/router'
import { useAuth } from '../../modules/useAuth'
import { useEffect } from 'react'

const RedirectToProfile = () => {
  const { user, data } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (data) {
      router.push(`/u/${data.username}`)
    }

    if (user && !data) {
      router.push('/create-account')
    }

    if (!user) {
      router.push('/signup')
    }
  }, [user, data])

  return null
}

export default RedirectToProfile
