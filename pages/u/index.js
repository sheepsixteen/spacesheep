import { useRouter } from 'next/router'
import { useAuth } from '../../modules/useAuth'
import { useEffect } from 'react'

const RedirectToProfile = () => {
  const { data } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (data) {
      router.push(`/u/${data.username}`)
    }
    
    if (data === false) {
      router.push('/signup')
    }
  }, [data])

  return null
}

export default RedirectToProfile
