// (almost) copy-pasted from https://usehooks.com/useAuth/ and /useRequireAuth/
// thanks
import React, { useState, useEffect, useContext, createContext } from 'react'
import firebase from '../modules/firebase'
import { useRouter } from 'next/router'

const authContext = createContext()

// Provider component that wraps your app and makes auth object
// available to any child component that calls useAuth().
export function ProvideAuth ({ children }) {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

/**
 * Hook for child components to get the auth object and re-render when it changes.
 */
export const useAuth = () => {
  return useContext(authContext)
}

/**
 * Hook which provides authentication
 * @param {Boolean} redirect - Should we redirect to /create-account if there is no data?
 */
function useProvideAuth () {
  const [user, setUser] = useState(null)
  const [data, setData] = useState(null)

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(false)
      })
  }

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any
  // component that utilizes this hook to re-render with the
  // latest auth object.
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(authUser => {
      if (authUser) {
        setUser(authUser)
      } else {
        setUser(false)
      }
    })
    // Cleanup subscription on unmount
    return () => unsubscribe()
  }, [])

  // Subsribe to firestore's save of the user on mount
  useEffect(() => {
    var unsubscribe = () => {}

    if (user) {
      console.log('getting from firebase')
      unsubscribe = firebase.firestore()
        .doc(`users/${user.uid}`)
        .onSnapshot(snapshot => {
          setData(snapshot.data() || false)
        })
    }

    return () => unsubscribe()
  }, [user])

  // Return the user object and auth methods
  return {
    user,
    data,
    signout
  }
}

/**
 * @typedef {Object} ExtraUserData - More information about the user, saved in firestore
 * @property {String} username - The user's display name (e.g. gamergod88)
 * @property {String} fullname - The user's full name (e.g. John Douglass)
 */

/**
 * @typedef {Object} MixedUser
 * @property {firebase.User | boolean} user - Firebase auth info, false if signed out
 * @property {ExtraUserData | boolean} data - Extra data about the user (saved in firestore), false if not set yet
 * @property {Function} signout - Signs the user out
 */

/**
 * Hook that requires the user to be signed in, and returns the user if they are
 * @param {*} redirectUrl
 *            The URL that should be redirect to if user isn't signed in
 * @param {*} redirectExtraDataUrl
 *            The URL to redirect to if the user hasn't created an account
 * @returns {MixedUser} - The current signed in user
 *
 * @example
 *
 *    const Dashboard = () => {
 *      const auth = useRequireAuth()
 *
 *      if (!auth) {
 *        return <Loading />
 *      }
 *
 *      return (
 *        <Page auth={auth} />
 *      )
 *    }
 */
export function useRequireAuth (
  redirectUrl = '/login',
  redirectExtraDataUrl = '/create-account'
) {
  const auth = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Redirect if not signed in
    if (auth.user === false) {
      router.push(redirectUrl)
    }

    // If extra data about user isn't there
    if (auth.data === false) {
      router.push(redirectExtraDataUrl)
    }
  }, [auth, router])

  return auth
}
