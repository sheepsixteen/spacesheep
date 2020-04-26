import { useAuth } from '../modules/useAuth'
import styled from 'styled-components'
import Avatar from '@atlaskit/avatar'
import { useState } from 'react'
import { Button } from '@atlaskit/button/dist/cjs/components/Button'
import EditIcon from '@atlaskit/icon/glyph/edit'
import TextArea from '@atlaskit/textarea'
import { ButtonGroup } from '@atlaskit/button'
import Form, { Field, FormFooter } from '@atlaskit/form'
import TextField from '@atlaskit/textfield'
import { fontSize } from '@atlaskit/theme'
import { FaGithub, FaLink } from 'react-icons/fa'
import { GoOrganization } from 'react-icons/go'

const ProfileData = () => {
  const { setData, data } = useAuth()
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div style={{ maxWidth: '30rem' }}>
      {isEditing ? (
        <Form onSubmit={data => {
          setIsEditing(false)
          let form = {}
          Object.keys(data).forEach(key => {
            if (key == 'username') return
            form[key] = data[key] || null
          })
          setData(form)
        }}>
          {({ formProps, submitting }) => (
            <form {...formProps}>
              <Field name='fullname' label='Full name' defaultValue={data.fullname}>
                {({ fieldProps, error }) => (
                  <TextField {...fieldProps} />
                )}
              </Field>
              <Field isDisabled name='username' label='Username' defaultValue={data.username}>
                {({ fieldProps, error }) => (
                  <TextField {...fieldProps} />
                )}
              </Field>
              <Field name='bio' label='Bio' defaultValue={data.bio}>
                {({ fieldProps, error }) => (
                  <TextArea {...fieldProps} />
                )}
              </Field>
              <Field name='github' label='Github username' defaultValue={data.github}>
                {({ fieldProps, error }) => (
                  <TextField elemBeforeInput={<FaGithub style={{ paddingLeft: '4px' }} />} {...fieldProps} />
                )}
              </Field>
              <Field name='website' label='Website' defaultValue={data.website}>
                {({ fieldProps, error }) => (
                  <TextField elemBeforeInput={<FaLink style={{ paddingLeft: '4px' }} />} {...fieldProps} />
                )}
              </Field>
              <Field name='company' label='Company' defaultValue={data.company}>
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
          <Avatar src={data.picture} appearance='square' size='xlarge' />
          
          {data.fullname && (
            <h1 style={{ marginTop: '1rem' }}>
              {data.fullname}
            </h1>
          )}
          
          {data.username && (
            <h2 style={{ marginTop: '0' }}>
              @{data.username}
            </h2>
          )}

          {data.bio && (
            <p style={{ fontSize: fontSize() * 1.1 }}>
              {data.bio}
            </p>
          )}

          <Gap size={0.5} />

          {data.github && (
            <ProfileLink>
              <FaGithub />
              <a href={'https://github.com/' + data.github}>
                {data.github}
              </a>
            </ProfileLink>
          )}
          {data.website && (
            <ProfileLink>
              <FaLink />
              <a href={data.website}>
                {data.website}
              </a>
            </ProfileLink>
          )}
          {data.company && (
            <ProfileLink>
              <GoOrganization />
              <a href={data.company}>
                {data.company}
              </a>
            </ProfileLink>
          )}

          <Gap size={1} />

          <Button
            onClick={e => setIsEditing(true)}
            iconBefore={<EditIcon />}
          >
            Edit Profile
          </Button>
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

export default ProfileData
