import styled from 'styled-components'
import Layout from '../components/Layout'
import MissionCard from '../components/MissionCard'
import SectionMessage from '@atlaskit/section-message'
import Link from 'next/link'
import { useAuth } from '../modules/useAuth'
import { useRouter } from 'next/router'
import { useEntities } from '../modules/useEntities'

const Missions = () => {
  const { user } = useAuth()
  const router = useRouter()
  const after = router.query.after
  const missions = useEntities('mission', 'missions', after)

  if (missions === null) {
    return <Layout title='Missions' loading />
  }

  if (missions === false) {
    return (
      <Layout title='Missions'>
        <SectionMessage appearance='error'>
          <p>Sorry, there was a problem loading the missions, try reloading the page?</p>
        </SectionMessage>
      </Layout>
    )
  }

  return (
    <Layout title='Missions'>
      <h1>
        Missions
      </h1>
      <p style={{ marginBottom: '2rem', maxWidth: '30rem' }}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae qui deserunt reiciendis laborum alias unde quisquam perspiciatis aliquid expedita harum inventore nihil corporis velit itaque dolorem quidem, earum porro! Dolorem.
      </p>

      {!user && (
        <>
          <SectionMessage>
            <p>
              <Link href='/signup'><a>Sign up</a></Link> or <Link href='/login'><a>login</a></Link> to star missions, save solutions and get personalized missions.
            </p>
          </SectionMessage>

          <Gap />
        </>
      )}

      {missions.map(x => <MissionCard key={x.id} id={x.id} {...x.data()} />)}
    </Layout>
  )
}

const Gap = styled.div`
  padding: 1rem 0;
`

export default Missions
