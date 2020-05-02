import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import firebase from '../../modules/firebase'
import Layout from '../../components/Layout'
import ProfileData from '../../components/ProfileData'
import { useAuth } from '../../modules/useAuth'
import SectionMessage from '@atlaskit/section-message'
import styled from 'styled-components'
import EmptyState from '@atlaskit/empty-state'
import Link from 'next/link'
import { Button } from '@atlaskit/button/dist/cjs/components/Button'
import Interaction from '../../components/Interaction'

const UserPage = () => {
  const router = useRouter()
  const { username } = router.query
  const { data } = useAuth()

  // User data
  const [userContent, setUserContent] = useState(null)

  // Entities the user has interacted with
  const [interactedEntities, setInteractedEntities] = useState(null)

  // Current page belongs to the signed-in user
  const [isMe, setIsMe] = useState(null)

  useEffect(() => {
    if (data && (username === data.username)) {
      setIsMe(true)
    } else {
      setIsMe(false)
    }
  }, [username, data])

  // Load user content for page
  useEffect(() => {
    function getUserContent (username) {
      firebase.firestore()
        .collection('users')
        .where('username', '==', username)
        .get()
        .then(snapshot => {
          if (snapshot.empty) {
            setUserContent(false)
          } else {
            setUserContent(snapshot.docs[0].data())
          }

          // get interactions
          return firebase.firestore()
            .collection('interactions')
            .where('uid', '==', snapshot.docs[0].id)
            .get()
        })
        .then(snapshot => {
          setInteractedEntities(snapshot.docs.map(e => e))
        })
    }

    if (username) {
      getUserContent(username)
    }
  }, [username])

  if (userContent === null || interactedEntities === null) {
    return <Layout title='Profile' loading />
  }

  if (userContent === false) {
    return (
      <Layout title='Profile'>
        <SectionMessage appearance='error'>
          <p>Couldn't find a user with the username "{username}"</p>
        </SectionMessage>
      </Layout>
    )
  }

  return (
    <Layout title={userContent.username}>
      <Grid>
        <ProfileData isMe={isMe} {...userContent} />

        <div>
          {interactedEntities && (
            <>
              <h2 style={{ marginBottom: '1rem' }}>Starred missions</h2>
              {interactedEntities.map(x => (
                <Interaction key={x.id} {...x.data()} />
              ))}
            </>
          )}

          {interactedEntities.length === 0 && (
            <SectionMessage>
              No activity
            </SectionMessage>
          )}

          {isMe && (interactedEntities.length === 0) && (
            <EmptyState
              header='No starred missions'
              description="You haven't starred any missions, when you star a few, they'll appear here."
              imageUrl='https://assets-ouch.icons8.com/preview/565/06ac6cf9-cb9e-415a-b529-e774069c0eed.png'
              primaryAction={
                <Link href='/missions'>
                  <Button appearance='primary'>Go to missions</Button>
                </Link>
              }
            />
          )}
        </div>
      </Grid>
    </Layout>
  )
}

const Grid = styled.div`
  display: grid;
  grid-gap: 2rem;
  @media screen and (min-width: 40rem) {
    grid-gap: 1rem;
    grid-template-columns: 1fr 3fr;
  }
`

export default UserPage
