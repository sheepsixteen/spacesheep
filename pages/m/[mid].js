import styled from 'styled-components'
import Layout from '../../components/Layout'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Tabs from '@atlaskit/tabs'
import useMission from '../../modules/useMission'
import MissionCard from '../../components/MissionCard'
import YourSolution from '../../components/YourSolution'
import CommunitySolutions from '../../components/CommunitySolutions'
import { codeFontFamily } from '@atlaskit/theme'

// TODO: add field validation
// TODO: split this into components
// TODO: add a "you entered the solution x days ago" text
// TODO: show other users' solutions
// TODO: fix 8px gap on the left of the tabs (so annoying)
// TODO: add "everything ok" once saved to firebase

const MissionPage = () => {
  const router = useRouter()
  const { mid } = router.query
  const { mission, missionSnapshot, content } = useMission(mid)
  const [selectedTab, setSelectedTab] = useState(0)

  if (!mission || !content) {
    return <Layout title='Loading...' loading />
  }

  return (
    <Layout title={mission.title}>
      <MissionCard noCard id={missionSnapshot.id} {...mission} />

      <MissionGrid>
        <MissionContent>
          <div style={{ fontFamily: codeFontFamily() }} dangerouslySetInnerHTML={{ __html: content }} />
        </MissionContent>

        <Tabs
          selected={selectedTab}
          onSelect={(selected, i) => setSelectedTab(i)}
          tabs={[
            {
              label: 'Your solution',
              content: <YourSolution mid={missionSnapshot.id} />
            },
            {
              label: 'Community solutions',
              content: <CommunitySolutions mid={missionSnapshot.id} />
            }
          ]}
        />
      </MissionGrid>
    </Layout>
  )
}

const MissionContent = styled.div`
  border: 1px solid #aaa;
  padding: 24px 24px 40px;
  border-radius: 2px;
  max-width: 60em;
  margin: 1rem auto;
`

const MissionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
  margin-top: 1rem;

  @media screen and (min-width: 690px) {
    grid-template-columns: 2fr 1fr;
  }
`

export default MissionPage
