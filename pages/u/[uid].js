import Layout from '../../components/Layout'
import styled from 'styled-components'
import Link from 'next/link'
import UserData from '../../components/UserData'
import useUser from '../../modules/useUser'
import { useRouter } from 'next/router'

const UserPage = () => {
  const router = useRouter()
  const { user } = useUser(router.query.uid)

  if (!user) {
    return <Layout loading />
  }

  return (
    <Layout title={user.username}>
      <Grid>
        <UserData {...user.data()} />
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
