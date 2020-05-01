import Layout from '../components/Layout'
import firebase from '../modules/firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import styled from 'styled-components'
import Router from 'next/router'
import { useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '../modules/useAuth'

const uiConfig = {
  signInFlow: 'redirect',
  signInSuccessUrl: '/missions',
  signInOptions: [
    firebase.auth.GithubAuthProvider.PROVIDER_ID
  ]
}

const Login = () => {
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      Router.push('/u')
    }
  }, [user])

  return (
    <Layout title='Log In'>
      <h1 style={{ textAlign: 'center' }}>Log in</h1>
      <Gap />
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      <p style={{ textAlign: 'center' }}>
        <Link href='/signup'>
          <a>Create an account</a>
        </Link>
      </p>
    </Layout>
  )
}

const Gap = styled.div`
  padding: 1rem 0;
`

export default Login
