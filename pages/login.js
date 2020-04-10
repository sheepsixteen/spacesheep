import Layout from '../components/Layout'
import firebase from '../modules/firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { useAuthState } from 'react-firebase-hooks/auth'
import styled from 'styled-components'
import Router from 'next/router'
import { useEffect } from 'react'

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
  const [user, initialising, error] = useAuthState(firebase.auth())

  if (user) {
    Router.push('/missions')
  }

  useEffect(() => {
    const script = document.createElement('script')

    script.innerText = 'setTimeout(()=>(document.getElementsByClassName("firebaseui-idp-text firebaseui-idp-text-long")[0].innerText = "Contine with Github"), 100)'

    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <Layout title='Log In'>
      <h1 style={{ textAlign: 'center' }}>Log in</h1>
      <Gap />
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      <p style={{ textAlign: 'center' }}>
        <a>Create an account here.</a>
      </p>
    </Layout>
  )
}

const Gap = styled.div`
  padding: 1rem 0;
`

export default Login
