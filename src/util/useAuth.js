// (almost) copy-pasted from https://usehooks.com/useAuth/ and /useRequireAuth/
// thanks
import React, { useEffect, useContext, createContext, useReducer } from 'react'
import firebase from '../util/firebase'
import { useRouter } from 'next/router'

const authContext = createContext()
const authLoadingContext = createContext()

// Provider component that wraps your app and makes auth object
// available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth()
  return (
    <authContext.Provider value={auth.user}>{children}</authContext.Provider>
  )
}

export function ProvideAuthLoading({ children }) {
  const auth = useProvideAuth()
  return (
    <authLoadingContext.Provider value={auth.isLoading}>
      {children}
    </authLoadingContext.Provider>
  )
}

/**
 * Hook for child components to get the auth object and re-render when it changes.
 */
export const useAuth = () => {
  return useContext(authContext)
}

export const useAuthLoading = () => {
  return useContext(authLoadingContext)
}

const authReducer = (state, [type, payload]) => {
  console.log({ type, payload })
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
        userData: payload.exists
          ? { ...payload.data(), uid: payload.id }
          : false,
        isLoading: false,
      }
    case 'SIGNED_OUT':
      return {
        authUser: null,
        userData: null,
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
    userData: null,
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
    var unsubscribe = () => {}

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
      !state.userData && // no userData
      !state.isLoading // and not loading
    ) {
      router.push('/create-account') // go to create-account
    }
  }, [state.authUser, state.userData])

  // Return the auth state
  return {
    user: state.userData,
    authUser: state.authUser,
    isLoading: state.isLoading,
    error: state.error,
  }
}
