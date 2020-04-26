import Layout from '../components/Layout'
import firebase from '../modules/firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { useAuthState } from 'react-firebase-hooks/auth'
import styled from 'styled-components'
import Router from 'next/router'
import { useEffect } from 'react'

const uiConfig = {
  signInFlow: 'redirect',
  signInSuccessUrl: '/create-account',
  signInOptions: [
    {
      provider: firebase.auth.GithubAuthProvider.PROVIDER_ID,
      scopes: [
        'user'
      ]
    }
  ]
}

const SignUp = () => {
  // TODO: handle error
  const [user, initialising, error] = useAuthState(firebase.auth())

  useEffect(() => {
    if (user && !initialising) {
      Router.push('/profile')
    }
  }, [user, initialising])

  return (
    <Layout title='Sign Up'>
      <h1 style={{ textAlign: 'center' }}>Sign up</h1>
      <Gap />
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </Layout>
  )
}

const Gap = styled.div`
  padding: 1rem 0;
`

export default SignUp
