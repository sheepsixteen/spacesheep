import { useState, useEffect } from 'react'
import firebase from './firebase'

/**
 * Gets a user that isn't the currently signed in one.
 */
const useUser = (username, uid) => {
  const [user, setUser] = useState(null)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function getUserByUsername (username) {
      try {
        const user = await firebase.firestore()
          .collection('users')
          .where('username', '==', username)
          .get()

        console.log(user.docs[0])
        setUser(user.docs[0])
      } catch (e) {
        console.error(e)
        setError({
          message: 'Couldn\'t find a user with that username.',
          error: e
        })
      }
    }

    if (username) {
      getUserByUsername(username)
    }
  }, [username])

  return { user, error }
}

export default useUser
