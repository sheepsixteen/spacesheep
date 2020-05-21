import { useAuth } from '../util/useAuth'
import TextField from '@atlaskit/textfield'
import Button, { ButtonGroup } from '@atlaskit/button'
import { Checkbox } from '@atlaskit/checkbox'
import Form, {
  CheckboxField,
  Field,
  FormFooter,
  HelperMessage,
  ErrorMessage
} from '@atlaskit/form'
import styled from 'styled-components'
import { useInteraction } from '../util/useInteraction'
import Link from 'next/link'
import SectionMessage from '@atlaskit/section-message'
import Spinner from '@atlaskit/spinner'
import Gist from 'react-gist'
import * as axios from 'axios'

const YourSolution = ({ mid }) => {
  const user = useAuth()
  const [interaction, setInteraction] = useInteraction(mid)

  async function submit (data) {
    try {
      await axios.get(`https://api.github.com/gists/${data.gist}`)
    } catch (e) {
      // If the request is NOT being rate limited, but there's still an error,
      // return an error.
      if (e.message !== 'Network Error') {
        return {
          gist: 'NOT_FOUND'
        }
      }
    }

    setInteraction({
      ...data,
      gist_submitted: new Date()
    })
    return undefined
  }

  // Error message if not signed in
  if (!user) {
    return (
      <div style={{ width: '100%' }}>
        <Gap />
        <SectionMessage>
          <p>
            <Link href='/signup'><a>Sign up</a></Link> or <Link href='/login'><a>login</a></Link> to save a solution to this mission.
          </p>
        </SectionMessage>
      </div>
    )
  }

  if (interaction === null) {
    return (
      <div style={{ width: '100%', padding: '2rem', textAlign: 'center' }}>
        <Spinner />
      </div>
    )
  }

  return (
    <div style={{ width: '100%' }}>
      <Form onSubmit={submit}>
        {({ formProps, submitting }) => (
          <form {...formProps}>
            <Gap />
            <Field name='gist' label='Gist id' defaultValue={interaction.gist}>
              {({ fieldProps, error }) => (
                <>
                  <TextField isRequired {...fieldProps} />
                  <HelperMessage>
                    <p>
                      Paste a <a href='https://gist.github.com/'>Github Gist</a>'s id into here to save a solution.
                    </p>
                  </HelperMessage>
                  {(error === 'NOT_FOUND') && (
                    <ErrorMessage>
                      We couldn't find a gist with that id.
                    </ErrorMessage>
                  )}
                </>
              )}
            </Field>
            <CheckboxField name='isPublic' label='Show to community' defaultIsChecked={interaction.isPublic}>
              {({ fieldProps }) => (
                <Checkbox {...fieldProps} label='Show your gist on this page and on your profile.' />
              )}
            </CheckboxField>
            <FormFooter>
              <ButtonGroup>
                <Button type='submit' appearance='primary' isLoading={submitting}>
                  Save solution
                </Button>
              </ButtonGroup>
            </FormFooter>
          </form>
        )}
      </Form>

      <Gap />
      <Gist id={interaction.gist} />
    </div>
  )
}

const Gap = styled.div`
  padding: .5rem 0;
`

export default YourSolution
