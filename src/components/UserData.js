import Avatar from '@atlaskit/avatar'
import { fontSize } from '@atlaskit/theme'
import { FaGithub, FaLink } from 'react-icons/fa'
import { GoOrganization } from 'react-icons/go'
import styled from 'styled-components'

const UserData = ({ user, data }) => {
  return (
    <>
      <Avatar src={user.photoURL} appearance="square" size="xlarge" />
      <h1 style={{ marginTop: '1rem' }}>{data.fullname}</h1>
      <h2 style={{ marginTop: '0' }}>@{data.username}</h2>
      {/* Bigger font <p> */}
      <p style={{ fontSize: fontSize() * 1.1 }}>{data.bio}</p>

      <Gap size={0.5} />

      {data.github && (
        <ProfileLink>
          <FaGithub />
          <a href={'https://github.com/' + data.github}>{data.github}</a>
        </ProfileLink>
      )}
      {data.website && (
        <ProfileLink>
          <FaLink />
          <a href={data.website}>{data.website}</a>
        </ProfileLink>
      )}
      {data.company && (
        <ProfileLink>
          <GoOrganization />
          <a href={data.company}>{data.company}</a>
        </ProfileLink>
      )}
    </>
  )
}

const Gap = styled.div`
  padding: ${(props) => (props.size ? props.size / 2 : '.5')}rem;
`

const ProfileLink = styled.p`
  display: flex;
  align-items: center;

  margin-top: 0.2rem;

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

export default UserData
