import firebase from '../modules/firebase'
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore'
import styled from 'styled-components'
import Spinner from '@atlaskit/spinner'
import SectionMessage from '@atlaskit/section-message'
import Solution from './Solution'

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
      {solutions.map(solution => (
        <Solution key={solution.id} {...solution} />
      ))}
    </div>
  )
}

const Gap = styled.div`
  padding: .5rem 0;
`

export default CommunitySolutions
