import Button, { ButtonGroup } from '@atlaskit/button'
import { Checkbox } from '@atlaskit/checkbox'
import Form, {
  CheckboxField,
  ErrorMessage,
  Field,
  FormFooter,
  HelperMessage,
} from '@atlaskit/form'
import SectionMessage from '@atlaskit/section-message'
import Spinner from '@atlaskit/spinner'
import TextField from '@atlaskit/textfield'
import * as axios from 'axios'
import Link from 'next/link'
import Gist from 'react-gist'
import styled from 'styled-components'

import useAuth from '../util/useAuth'
import { useInteraction } from '../util/useInteraction'

const YourSolution = ({ mid }) => {
  const { user } = useAuth()
  const [interaction, setInteraction] = useInteraction(mid)

  async function submit(data) {
    try {
      await axios.get(`https://api.github.com/gists/${data.gist}`)
    } catch (e) {
      // If the request is NOT being rate limited, but there's still an error,
      // return an error.
      if (e.message !== 'Network Error') {
        return {
          gist: 'NOT_FOUND',
        }
      }
    }

    setInteraction({
      ...data,
      gist_submitted: new Date(),
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
            <Link href="/signup">
              <a>Sign up</a>
            </Link>{' '}
            or{' '}
            <Link href="/login">
              <a>login</a>
            </Link>{' '}
            to save a solution to this mission.
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

  return <div style={{ width: '100%' }}></div>
}

const Gap = styled.div`
  padding: 0.5rem 0;
`

export default YourSolution
