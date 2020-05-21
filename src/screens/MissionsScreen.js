import PropTypes from 'prop-types'
import Layout from 'components/Layout'
import Hero from 'components/Hero'
import Card, { CardItem } from 'elements/Card'
import { useAuth } from 'util/useAuth'
import Info from 'elements/Info'
import MissionItem from 'components/MissionItem'
import { Button } from '@atlaskit/button/dist/cjs/components/Button'
import FilterIcon from '@atlaskit/icon/glyph/filter'

const MissionsScreen = ({ missions }) => {
  const user = useAuth()

  return (
    <Layout title="Missions" hero={<Hero title="Missions" body="this is lorem ipsum" />}>
      {!user && <Info>Sign in</Info>}

      {/* TODO: Add sort functionality */}
      <Card header={<Button iconBefore={<FilterIcon />} appearance="subtle" onClick={() => alert('Coming soon')}>Sort by</Button>}>
        {missions.map((m) => (
          <MissionItem key={m.id} {...m} />
        ))}
      </Card>
    </Layout>
  )
}

MissionsScreen.propTypes = {
  missions: PropTypes.arrayOf(PropTypes.object),
}

export default MissionsScreen
