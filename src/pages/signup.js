import Layout from '../components/Layout'
import firebase from '../util/firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import styled from 'styled-components'
import Router from 'next/router'
import { useEffect } from 'react'
import { useAuth } from '../util/useAuth'

const uiConfig = {
  signInFlow: 'redirect',
  signInSuccessUrl: '/create-account',
  signInOptions: [
    firebase.auth.GithubAuthProvider.PROVIDER_ID
  ]
}

const SignUp = () => {
  const user = useAuth()

  useEffect(() => {
    if (user) {
      Router.push('/profile')
    }
  }, [user])

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
