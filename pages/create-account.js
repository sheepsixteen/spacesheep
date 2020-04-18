import Layout from '../components/Layout'
import { useAuth } from '../modules/useAuth'
import Form, { Field, FormFooter, HelperMessage } from '@atlaskit/form'
import Button, { ButtonGroup } from '@atlaskit/button'
import TextField from '@atlaskit/textfield'
import firebase from '../modules/firebase'
import { useRouter } from 'next/router'

const CreateAccount = () => {
  const { user, data } = useAuth()
  const router = useRouter()

  if (!user) {
    return (
      <Layout title='Create Account' loading />
    )
  }

  return (
    <Layout title='Create Account'>
      <p>
        We found some information from <em>{user.providerData[0].providerId}</em>
      </p>

      <Form onSubmit={data => {
        return firebase.firestore()
          .doc(`/users/${user.uid}`)
          .set(data)
          .then(() => { router.push('/missions') })
      }}
      >
        {({ formProps, submitting }) => (
          <form {...formProps}>
            <Field name='username' defaultValue={user.displayName} label='Display name' isRequired>
              {({ fieldProps }) => <TextField {...fieldProps} />}
            </Field>
            <HelperMessage>
              This will be the way your account is shown to other users, for example, next to your public mission solutions.
            </HelperMessage>

            <Field name='fullname' label='Full name'>
              {({ fieldProps }) => <TextField {...fieldProps} />}
            </Field>
            <HelperMessage>
              We'll put this on your profile page.
            </HelperMessage>

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

export default CreateAccount
