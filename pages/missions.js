import styled from 'styled-components'
import Layout from '../components/Layout'
import MissionCard from '../components/MissionCard'
import firebase from '../modules/firebase'
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import Spinner from '@atlaskit/spinner'
import SectionMessage from '@atlaskit/section-message'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const Missions = () => {
  const [missions, loading, missionsError] = useCollectionDataOnce(
    firebase.firestore().collection('missions'),
    { idField: 'id' }
  )

  const [user, initialising, authError] = useAuthState(firebase.auth())
  const [stars, setStars] = useState(null)

  useEffect(() => {
    const getStars = () => {
      firebase.firestore()
        .collection(`/users/${user.uid}/stars`)
        .where('starred', '==', true)
        .get()
        .then(snapshot => {
          const stars = []
          snapshot.docs.forEach(doc => stars.push(doc.id))
          setStars(stars)
          console.log(stars)
        })
    }

    if (user) {
      getStars()
    }
  }, [user])

  return (
    <Layout title='Missions'>
      <h1>
        Missions
      </h1>
      <p style={{ marginBottom: '2rem', maxWidth: '30rem' }}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae qui deserunt reiciendis laborum alias unde quisquam perspiciatis aliquid expedita harum inventore nihil corporis velit itaque dolorem quidem, earum porro! Dolorem.
      </p>

      {
        (missionsError || (missions && missions.length == 0)) &&
          <SectionMessage appearance='error'>
            <p>Sorry, we couldn't load the missions, try reloading the page?</p>
          </SectionMessage>
      }

      {
        (!initialising && !user) &&
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
        user
          ? <>{
            (missions && (stars !== null))
              ? <MissionGrid>
                {missions.map(x => <MissionCard key={x.id} {...x} uid={user.uid} starred={stars.includes(x.id)} />)}
                </MissionGrid>
              : <MissionGridSpinner>
                <Spinner size='medium' />
                </MissionGridSpinner>
          }
          </>
          : <>{
            missions
              ? <MissionGrid>
                {missions.map(x => <MissionCard key={x.id} {...x} />)}
              </MissionGrid>
              : <MissionGridSpinner>
                <Spinner size='medium' />
              </MissionGridSpinner>
          }
          </>
      }

    </Layout>
  )
}

const MissionGrid = styled.div``

const MissionGridSpinner = styled.div`
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Gap = styled.div`
  padding: 1rem 0;
`

export default Missions
