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

  useEffect(() => {
    if (!user && !initialising) {
      Router.push('/login')
    }
  }, [user, initialising])

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

export default Login
