import firebase from '../modules/firebase'
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore'
import styled from 'styled-components'
import Spinner from '@atlaskit/spinner'
import SectionMessage from '@atlaskit/section-message'

const CommunitySolutions = ({ mid }) => {
  const [solutions, loading, error] = useCollectionDataOnce(
    firebase.firestore()
      .collection('interactions')
      .where('eid', '==', mid)
      .where('isPublic', '==', true)
      .limit(10),
    { idField: 'id' }
  )

  if (loading) {
    return (
      <div style={{ width: '100%', padding: '2rem', textAlign: 'center' }}>
        <Spinner />
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ width: '100%', padding: '2rem 0' }}>
        <SectionMessage appearance='error'>
          <p>There was a problem loading the solutions.</p>
        </SectionMessage>
      </div>
    )
  }

  return (
    <div style={{ width: '100%' }}>
      <Gap />
      {
        solutions.map(({ id, username, gist }) => (
          <Solution key={id}>
            <h4>
              <a href={'https://gist.github.com/' + gist}>Solution by {username}</a>
            </h4>
          </Solution>
        ))
      }
    </div>
  )
}

const Gap = styled.div`
  padding: .5rem 0;
`

const Solution = styled.div`
  border: 1px solid #eee;
  padding: 1rem;
  border-radius: 4px;

  h4:hover {
    text-decoration: none;
  }
`

export default CommunitySolutions
