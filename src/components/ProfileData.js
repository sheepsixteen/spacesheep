import { useAuth } from '../util/useAuth'
import styled from 'styled-components'
import Avatar from '@atlaskit/avatar'
import { useState, useEffect } from 'react'
import { Button } from '@atlaskit/button/dist/cjs/components/Button'
import EditIcon from '@atlaskit/icon/glyph/edit'
import TextArea from '@atlaskit/textarea'
import { ButtonGroup } from '@atlaskit/button'
import Form, { Field, FormFooter } from '@atlaskit/form'
import TextField from '@atlaskit/textfield'
import { fontSize } from '@atlaskit/theme'
import { FaGithub, FaLink } from 'react-icons/fa'
import { GoOrganization } from 'react-icons/go'
import PropTypes from 'prop-types'

// props: { fullname, username, bio, github, website, company }

const ProfileData = (props) => {
  const { setData: setInfoInDatabase } = useAuth()
  const [userInfo, setUserInfo] = useState(props)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    // when user data changes in form
    if (userInfo.shouldUpdate) {
      // update in the database
      setInfoInDatabase(userInfo)
    }
  }, [userInfo])

  if (!props) {
    return <div />
  }

  return (
    <div style={{ maxWidth: '30rem' }}>
      {(isEditing && props.isMe) ? (
        <Form onSubmit={data => {
          setIsEditing(false)
          const form = {}
          Object.keys(data).forEach(key => {
            if (key === 'username') return
            form[key] = data[key] || null
          })
          setUserInfo({ ...form, shouldUpdate: true })
        }}
        >
          {({ formProps, submitting }) => (
            <form {...formProps}>
              <Field name='fullname' label='Full name' defaultValue={userInfo.fullname}>
                {({ fieldProps, error }) => (
                  <TextField {...fieldProps} />
                )}
              </Field>
              <Field isDisabled name='username' label='Username' defaultValue={userInfo.username}>
                {({ fieldProps, error }) => (
                  <TextField {...fieldProps} />
                )}
              </Field>
              <Field name='bio' label='Bio' defaultValue={userInfo.bio}>
                {({ fieldProps, error }) => (
                  <TextArea {...fieldProps} />
                )}
              </Field>
              <Field name='github' label='Github username' defaultValue={userInfo.github}>
                {({ fieldProps, error }) => (
                  <TextField elemBeforeInput={<FaGithub style={{ paddingLeft: '4px' }} />} {...fieldProps} />
                )}
              </Field>
              <Field name='website' label='Website' defaultValue={userInfo.website}>
                {({ fieldProps, error }) => (
                  <TextField elemBeforeInput={<FaLink style={{ paddingLeft: '4px' }} />} {...fieldProps} />
                )}
              </Field>
              <Field name='company' label='Company' defaultValue={userInfo.company}>
                {({ fieldProps, error }) => (
                  <TextField elemBeforeInput={<GoOrganization style={{ paddingLeft: '4px' }} />} {...fieldProps} />
                )}
              </Field>
              <FormFooter align='start'>
                <ButtonGroup>
                  <Button type='submit' appearance='primary' isLoading={submitting}>
                    Update profile
                  </Button>
                  <Button onClick={e => setIsEditing(false)} appearance='subtle'>
                    Cancel
                  </Button>
                </ButtonGroup>
              </FormFooter>
            </form>
          )}
        </Form>
      ) : (
        <>
          <Avatar src={props.picture} appearance='square' size='xlarge' />

          {userInfo.fullname && (
            <h1 style={{ marginTop: '1rem' }}>
              {userInfo.fullname}
            </h1>
          )}

          {userInfo.username && (
            <h2 style={{ marginTop: '0' }}>
              @{userInfo.username}
            </h2>
          )}

          {userInfo.bio && (
            <p style={{ fontSize: fontSize() * 1.1 }}>
              {userInfo.bio}
            </p>
          )}

          <Gap size={0.5} />

          {userInfo.github && (
            <ProfileLink>
              <FaGithub />
              <a href={'https://github.com/' + userInfo.github}>
                {userInfo.github}
              </a>
            </ProfileLink>
          )}
          {userInfo.website && (
            <ProfileLink>
              <FaLink />
              <a href={userInfo.website}>
                {userInfo.website}
              </a>
            </ProfileLink>
          )}
          {userInfo.company && (
            <ProfileLink>
              <GoOrganization />
              <a href={userInfo.company}>
                {userInfo.company}
              </a>
            </ProfileLink>
          )}

          <Gap size={1} />

          {props.isMe && (
            <Button
              onClick={e => setIsEditing(true)}
              iconBefore={<EditIcon />}
            >
              Edit Profile
            </Button>
          )}
        </>
      )}
    </div>
  )
}

const Gap = styled.div`
  padding: ${props => props.size ? props.size / 2 : '.5'}rem;
`

const ProfileLink = styled.p`
  display: flex;
  align-items: center;
  
  margin-top: .2rem;

  &:first-of-type {
    margin-top: 2rem;
  }

  a:first-child {
    color: red;
  }

  a { 
    margin-top: 0;
    margin-left: 4px;
  }
`

ProfileData.propTypes = {
  isMe: PropTypes.bool,
  fullname: PropTypes.string,
  username: PropTypes.string,
  bio: PropTypes.string,
  github: PropTypes.string,
  website: PropTypes.string,
  company: PropTypes.string,
  picture: PropTypes.string
}

export default ProfileData
