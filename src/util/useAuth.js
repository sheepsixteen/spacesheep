// (almost) copy-pasted from https://usehooks.com/useAuth/ and /useRequireAuth/

import { useRouter } from 'next/router'
import { useEffect, useReducer } from 'react'
import { createContainer } from 'react-tracked'
import firebase from 'util/firebase'

const authReducer = (state, [type, payload]) => {
  switch (type) {
    case 'AUTH_STATE_CHANGED':
      return {
        ...state,
        authUser: payload,
        isLoading: true,
      }
    case 'USER_DATA_FETCHED':
      return {
        ...state,
        user: payload.exists ? { ...payload.data(), uid: payload.id } : false,
        isLoading: false,
      }
    case 'SIGNED_OUT':
      return {
        authUser: null,
        user: null,
        isLoading: false,
      }
    case 'AUTH_ERROR':
      return {
        ...state,
        isLoading: false,
        error: payload,
      }
    default:
      console.error(`Invalid action type: ${type}.`)
      return {
        ...state,
      }
  }
}

/**
 * Hook which provides the signed-in user data,
 * (also redirects when not created account)
 */
function useProvideAuth() {
  const router = useRouter()
  const [state, dispatch] = useReducer(authReducer, {
    authUser: null,
    user: null,
    isLoading: true,
    error: null,
  })

  // On mount, subscribe to user
  useEffect(() => {
    // when auth state changes, dispatch to reducer
    const unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        dispatch(['AUTH_STATE_CHANGED', firebaseUser])
      } else {
        dispatch(['SIGNED_OUT'])
      }
    })

    // Cleanup subscription on unmount
    return () => unsubscribe()
  }, [])

  // When signed in, subscribe to user data
  useEffect(() => {
    let unsubscribe = () => {}

    if (state.authUser) {
      unsubscribe = firebase
        .firestore()
        .doc(`users/${state.authUser.uid}`)
        .onSnapshot(
          (snapshot) => dispatch(['USER_DATA_FETCHED', snapshot]),
          (err) => dispatch(['AUTH_ERROR', err])
        )
    }

    return () => unsubscribe()
  }, [state.authUser])

  // At any point, if the user is signed in but there is no data saved,
  // redirect to /create-account
  useEffect(() => {
    if (
      state.authUser && // if signed in
      !state.user && // no user
      !state.isLoading // and not loading
    ) {
      router.push('/create-account') // go to create-account
    }
  }, [state.authUser, state.user])

  // Return the auth state
  return [
    state,
    () =>
      new Error(
        '(in useAuth) You seem to be trying to update the user object through the useAuth hook, please update using firebase.auth() instead.'
      ),
  ]
}

const { Provider, useTrackedState } = createContainer(useProvideAuth)

export default useTrackedState as default
export { Provider as AuthProvider }
