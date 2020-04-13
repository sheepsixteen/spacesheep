import Layout from '../components/Layout'
import firebase from '../modules/firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { useAuthState } from 'react-firebase-hooks/auth'
import styled from 'styled-components'
import Router from 'next/router'
import { useEffect } from 'react'
import Link from 'next/link'

const uiConfig = {
  signInFlow: 'redirect',
  signInSuccessUrl: '/missions',
  signInOptions: [
    {
      provider: firebase.auth.GithubAuthProvider.PROVIDER_ID,
      scopes: [
        'user'
      ]
    }
  ]
}

const Login = () => {
  // TODO: handle error
  const [user] = useAuthState(firebase.auth())

  useEffect(() => {
    if (user) {
      Router.push('/missions')
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
