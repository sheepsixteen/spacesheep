import styled from 'styled-components'
import Layout from '../components/Layout'
import MissionCard from '../components/MissionCard'
import firebase from '../modules/firebase'
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore'
import SectionMessage from '@atlaskit/section-message'
import Link from 'next/link'
import { useAuth } from '../modules/useAuth'
import { useRouter } from 'next/router'

const Missions = () => {
  const { user, data } = useAuth()
  const router = useRouter()

  if (data === false) {
    router.push('/create-account')
  }

  const [missions, loading, missionsError] = useCollectionDataOnce(
    firebase.firestore()
      .collection('entities')
      .where('type', '==', 'mission'),
    { idField: 'id' }
  )

  if (loading) {
    return <Layout title='Missions' loading />
  }

  return (
    <Layout title='Missions'>
      <h1>
        Missions
      </h1>
      <p style={{ marginBottom: '2rem', maxWidth: '30rem' }}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae qui deserunt reiciendis laborum alias unde quisquam perspiciatis aliquid expedita harum inventore nihil corporis velit itaque dolorem quidem, earum porro! Dolorem.
      </p>

      {
        missionsError && (
          <SectionMessage appearance='error'>
            <p>Sorry, we couldn't load the missions, try reloading the page?</p>
          </SectionMessage>
        )
      }

      {
        !user &&
          <>
            <SectionMessage>
              <p>
                <Link href='/signup'><a>Sign up</a></Link> or <Link href='/login'><a>login</a></Link> to star missions, save solutions and get personalized missions.
              </p>
            </SectionMessage>

            <Gap />
          </>
      }

      {
        missions.map(x => <MissionCard key={x.id} {...x} />)
      }
    </Layout>
  )
}

const Gap = styled.div`
  padding: 1rem 0;
`

export default Missions
