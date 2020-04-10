import Layout from '../components/Layout'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase from '../modules/firebase'
import Spinner from '@atlaskit/spinner'
import styled from 'styled-components'
import Avatar from '@atlaskit/avatar'
import MissionCard from '../components/MissionCard'
import { useEffect, useState } from 'react'
import Router from 'next/router'
import EmptyState from '@atlaskit/empty-state'
import { Button } from '@atlaskit/button/dist/cjs/components/Button'
import ModalDialog, { ModalTransition } from '@atlaskit/modal-dialog'
import Link from 'next/link'
import { colors } from '@atlaskit/theme'

// TODO: deleting your account requires recent login - make that work

const Profile = () => {
  const [user, initialising, error] = useAuthState(
    firebase.auth()
  )

  const [missions, setMissions] = useState([])
  const [deleteIsOpen, setDeleteIsOpen] = useState(false)

  useEffect(() => {
    if (!initialising) {
      if (!user || error) {
        Router.push('/login')
      }
    }
  }, [user, initialising])

  useEffect(() => {
    const getStars = () => {
      firebase.firestore()
        .collection(`/users/${user.uid}/stars`)
        .where('starred', '==', true)
        .get()
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
            firebase.firestore()
              .doc(`/missions/${doc.id}`)
              .get()
              .then(mission => setMissions([...missions, mission]))
          })
        })
    }

    if (user) {
      getStars()
    }
  }, [user])

  const deleteAccount = () => {
    user.delete().then(done => {
      Router.push('/')
    })
  }

  return (
    <Layout title='Profile'>
      {
        user
          ? (
            <>
              <Avatar src={user.photoURL} appearance='square' size='xlarge' href='#' />
              <h1 style={{ marginTop: '1rem' }}>{user.displayName}</h1>
              <Gap />
              <h3>Starred missions</h3>
              <Gap />
              {
                missions !== null
                  ? missions.map(x =>
                    <MissionCard starred uid={user.uid} key={x.id} id={x.id} {...x.data()} />
                  )
                  : (
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

              <DangerZone>
                <h3>Danger zone</h3>
                <Gap />
                <Button onClick={e => setDeleteIsOpen(true)} appearance='danger'>Delete your account</Button>
              </DangerZone>
            </>
          )
          : <SpinnerContainer><Spinner /></SpinnerContainer>
      }

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
      </ModalTransition>
    </Layout>
  )
}

const SpinnerContainer = styled.div`
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Gap = styled.div`
  padding: .5rem 0;
`

const DangerZone = styled.div`
  padding: 2rem;
  border-radius: 4px;
  border: 1px solid ${props => colors.R100}
`

export default Profile
