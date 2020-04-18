import Layout from '../components/Layout'
import { useRequireAuth } from '../modules/useAuth'
import firebase from '../modules/firebase'
import styled from 'styled-components'
import Avatar from '@atlaskit/avatar'
import MissionCard from '../components/MissionCard'
import { useEffect, useState } from 'react'
import EmptyState from '@atlaskit/empty-state'
import { Button } from '@atlaskit/button/dist/cjs/components/Button'
import Link from 'next/link'
import { colors } from '@atlaskit/theme'

// TODO: deleting your account requires recent login - make that work

const Profile = () => {
  const { user, data } = useRequireAuth()
  const [entities, setEntities] = useState(null)

  useEffect(() => {
    function handleEntitiesSnapshot (snapshot) {
      var entitiesPromises = []

      snapshot.docs.forEach(doc => {
        entitiesPromises.push(
          firebase.firestore().doc(`/entities/${doc.data().eid}`).get()
        )
      })

      Promise.all(entitiesPromises)
        .then(allEntities => setEntities(allEntities))
    }

    function getInteractions () {
      firebase.firestore()
        .collection('/interactions')
        .where('uid', '==', user.uid)
        .where('isStarred', '==', true)
        .get()
        .then(handleEntitiesSnapshot)
    }

    if (user) {
      getInteractions()
    }
  }, [user])

  if (!user || !data || !entities) {
    return <Layout title='Profile' loading />
  }

  return (
    <Layout title='Profile'>
      <Avatar src={user.photoURL} appearance='square' size='xlarge' href='#' />
      <h1 style={{ marginTop: '1rem' }}>{data.fullname}</h1>
      <h2 style={{ marginTop: '0' }}>@{data.username}</h2>
      <Gap />

      <h3>Starred missions</h3>
      <Gap />
      {
        entities.map(x => <MissionCard key={x.id} id={x.id} {...x.data()} />)
      }

      {
        (entities.length === 0) && (
          <EmptyState
            css='background-color: #eee'
            header='No starred missions'
            description="You haven't starred any missions, when you star a few, they'll appear here."
            imageUrl='https://assets-ouch.icons8.com/preview/565/06ac6cf9-cb9e-415a-b529-e774069c0eed.png'
            primaryAction={
              <Link href='/missions'><Button appearance='primary'>Go to missions</Button></Link>
            }
          />
        )
      }

      <Gap />

      {/* <DangerZone>
        <h3>Danger zone</h3>
        <Gap />
        <Button onClick={e => setDeleteIsOpen(true)} appearance='danger'>Delete your account</Button>
      </DangerZone>

      <ModalTransition>
        {
          deleteIsOpen &&
            <ModalDialog
              actions={[
                { text: 'Delete', onClick: deleteAccount },
                { text: 'Close', onClick: e => setDeleteIsOpen(false) }
              ]}
              appearance='danger'
              onClose={e => setDeleteIsOpen(false)}
              heading='Delete your account?'
            >
            This is non-reversible, so you won't be able to get your data back.
            </ModalDialog>
        }
      </ModalTransition> */}
    </Layout>
  )
}

const Gap = styled.div`
  padding: .5rem 0;
`

export default Profile
