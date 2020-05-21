import Layout from '../components/Layout'
import { useAuth } from '../util/useAuth'
import Form, { Field, FormFooter, HelperMessage, ErrorMessage, FormSection } from '@atlaskit/form'
import Button, { ButtonGroup } from '@atlaskit/button'
import TextField from '@atlaskit/textfield'
import firebase from '../util/firebase'
import { useRouter } from 'next/router'
import SectionMessage from '@atlaskit/section-message'
import { useEffect } from 'react'
import styled from 'styled-components'

const CreateAccount = () => {
  const user = useAuth()
  const router = useRouter()

  async function createAccount (data) {
    return firebase.functions()
      .httpsCallable('setUsername')({
        username: data.username,
        picture: data.picture
      })
      .then(() => {
        router.push('/profile')
      }).catch(err => {
        console.log({ message: err.message })
        return { username: err.message }
      })
  }

  if (user === null) {
    return (
      <Layout title='Create Account' loading />
    )
  }

  return (
    <Layout title='Create Account'>
      <Form onSubmit={createAccount}>
        {({ formProps, submitting }) => (
          <form {...formProps}>
            <FormSection title='Choose a username'>
              <Gap />
              <SectionMessage appearance='warning'>
                <p>You won't be able to change your username later.</p>
              </SectionMessage>
              <Gap />

              <Field name='username' label='Username' isRequired>
                {({ fieldProps, error }) => (
                  <>
                    <TextField {...fieldProps} />
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                  </>
                )}
              </Field>
              <HelperMessage>
                <p>This will be the way your account is shown to other users, for example, next to your public mission solutions.</p>
              </HelperMessage>
            </FormSection>

            <FormFooter>
              <ButtonGroup>
                <Button type='submit' appearance='primary' isLoading={submitting}>
                  Create your account
                </Button>
              </ButtonGroup>
            </FormFooter>
          </form>
        )}
      </Form>
    </Layout>
  )
}

const Gap = styled.div`
  padding: .5rem;
`

export default CreateAccount
