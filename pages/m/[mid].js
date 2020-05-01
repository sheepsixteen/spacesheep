import styled from 'styled-components'
import Layout from '../../components/Layout'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Tabs from '@atlaskit/tabs'
import useMission from '../../modules/useMission'
import MissionCard from '../../components/MissionCard'
import YourSolution from '../../components/YourSolution'
import CommunitySolutions from '../../components/CommunitySolutions'

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

      <div style={{ marginTop: '1.5rem', maxWidth: '60rem' }} dangerouslySetInnerHTML={{ __html: content }} />

      <Gap />

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
    </Layout>
  )
}

const Gap = styled.div`
  padding: 1rem 0;
`

export default MissionPage
