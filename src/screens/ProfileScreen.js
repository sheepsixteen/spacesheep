import Avatar from '@atlaskit/avatar'
import Button from '@atlaskit/button'
import Flag, { AutoDismissFlag, FlagGroup } from '@atlaskit/flag'
import Tick from '@atlaskit/icon/glyph/check-circle'
import EditIcon from '@atlaskit/icon/glyph/edit'
import { ModalTransition } from '@atlaskit/modal-dialog'
import { EditProfile } from 'components/Profile'
import { useState } from 'react'
import useAuth from 'util/useAuth'

import Layout from '../components/Layout'

const ProfileScreen = ({ profile }) => {
  const { username, fullname, picture, bio, github, website } = profile
  const { user } = useAuth()
  const isInteractive = user ? user.uid === profile.uid : false
  const [isEditing, setIsEditing] = useState(false)

  return (
    <Layout title={username} noContainer>
      <div className="hero">
        <div className="hero-body">
          <div className="profile-grid">
            <Avatar appearance="square" src={picture} size="xxlarge" />

            <div className="content">
              <h1>{fullname}</h1>
              <h2 style={{ marginTop: '.5rem' }}>@{username}</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {bio && (
          <>
            <h5 className="subtitle">Bio</h5>
            <p>{bio}</p>
          </>
        )}

        {github && (
          <>
            <h5 className="subtitle">Github</h5>
            <a href={`https://github.com/${github}`}>{github}</a>
          </>
        )}

        {website && (
          <>
            <h5 className="subtitle">Website</h5>
            <a href={website}>{website}</a>
          </>
        )}

        {isInteractive && (
          <p>
            <Button
              onClick={(e) => setIsEditing(true)}
              iconBefore={<EditIcon />}
            >
              Edit profile
            </Button>
          </p>
        )}
      </div>

      <ModalTransition>
        {isEditing && (
          <EditProfile
            uid={user.uid}
            profile={profile}
            onClose={(e) => setIsEditing(false)}
          />
        )}
      </ModalTransition>
    </Layout>
  )
}

export default ProfileScreen
