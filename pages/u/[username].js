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

const UserPage = () => {
  const router = useRouter()
  const { username } = router.query
  const { user, data } = useAuth()
  
  // User data
  const [userContent, setUserContent] = useState(null)

  // Entities the user has interacted with
  const [interactedEntities, setInteractedEntities] = useState(null)
  
  // Current page belongs to the signed-in user
  const [isMe, setIsMe] = useState(null)

  useEffect(() => {
    if (user && (username === user.username)) {
      setIsMe(true)
    } else {
      setIsMe(false)
    }
  }, [username, user])

  // Load user content for page
  useEffect(() => {
    function getUserContent (username) {
      console.log(username)
      firebase.firestore()
        .collection('users')
        .where('username', '==', username)
        .get()
        .then(snapshot => {
          const user = snapshot.docs[0]

          if (user !== undefined) {
            setUserContent(user.data())
          } else {
            setUserContent(false)
          }
        })
    }

    function getInteractedEntities (username) {
      firebase.firestore()
        .collection('/interactions')
        .where('username', '==', username)
        .get()
        .then(snapshot => {
          var interactedEntitiesPromises = snapshot.docs.map(doc => firebase.firestore().doc(`/entities/${doc.data().eid}`).get())
          Promise.all(interactedEntitiesPromises)
            .then(entities => setInteractedEntities(entities))
        })
        .catch(err => {
          console.log(err)
        })
    }

    if (userContent && interactedEntities) {
      return
    }

    if (data) {
      getInteractedEntities(username)
      
      // If signed in and username is my username load my content
      if (data.username === username) {
        setUserContent(data)
      }

      // If signed in and username is not my username, load content
      if (data.username !== username) {
        getUserContent(username)
      }
    }
    
    // If not signed in, get the user content
    if (data === false) {
      getInteractedEntities(username)
      getUserContent(username)
    }
  }, [username, data])

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
        <ProfileData {...userContent} />

        <div>
          {interactedEntities && interactedEntities.map(x => <MissionCard key={x.id} id={x.id} {...x.data()} />)}

          {interactedEntities.length === 0 && (
            <SectionMessage>
              No activity
            </SectionMessage>
          )}

          {isMe &&(interactedEntities.length === 0) && (
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


const Gap = styled.div`
  padding: .5rem 0;
`

const Grid = styled.div`
  display: grid;
  grid-gap: 2rem;
  @media screen and (min-width: 40rem) {
    grid-gap: 1rem;
    grid-template-columns: 1fr 3fr;
  }
`

export default UserPage
