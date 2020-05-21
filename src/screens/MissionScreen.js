import Layout from 'components/Layout'
import Card from 'elements/Card'
import Tag from 'elements/Tag'
import TagGroup from '@atlaskit/tag-group'
import theme from 'styles/theme'
import { useAuth } from 'util/useAuth'
import { ButtonGroup } from '@atlaskit/button'
import { WorkStatus, Star } from 'components/Interactions'
import { useInteraction } from 'util/useInteraction'
import { BreadcrumbsStateless, BreadcrumbsItem } from '@atlaskit/breadcrumbs'
import Source from 'elements/Source'
import InlineMessage from '@atlaskit/inline-message'
import Link from 'next/link'
import Tooltip from '@atlaskit/tooltip'

const MissionScreen = ({ mission }) => {
  const user = useAuth()
  const [interaction, setInteraction] = useInteraction(mission.id)

  return (
    <Layout title={mission.title}>
      <div className="layout">
        <div className="title">
          <h1>{mission.title}</h1>
        </div>

        <Card
          header={
            mission.source ? (
              <Source source={mission.source} />
            ) : (
              <p>Unkown source</p>
            )
          }
        >
          <div
            className="card-body"
            dangerouslySetInnerHTML={{ __html: mission.body }}
          ></div>
        </Card>

        <div className="sidebar">
          <div className="section">
            <p>Tags</p>
            <TagGroup>
              {mission.tags &&
                mission.tags.map((tag) => (
                  <Tag key={tag} text={tag} color="gray" />
                ))}
            </TagGroup>

          </div>
          <div className="section">
            <p>Actions</p>
            {user ? (
              <ButtonGroup>
                <WorkStatus {...{ interaction, setInteraction }} />
                <Star {...{ interaction, setInteraction }} />
              </ButtonGroup>
            ) : (
              <Link href="/login" passHref>
                <a>
                  <InlineMessage
                    onClick={e => e.preventDefault()}
                    title={<p>Login to interact with this mission</p>}
                  />
                </a>
              </Link>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .layout {
          display: grid;
          grid-template-columns: 1fr;
          grid-gap: 0.5rem;
        }

        .title {
          padding-bottom: 1rem;
          border-bottom: 1px solid ${theme.colors.darkerBackground};
        }

        .mission {
          margin-top: 2rem;
        }

        .card-body {
          padding: 12px 12px 16px;
        }

        .section {
          padding: 4px 0;
          margin-top: 0.6rem;
        }

        .section p {
          color: ${theme.colors.subtleHeader};
          margin-bottom: 0.4rem;
        }

        @media screen and (min-width: 60em) {
          .layout {
            margin-top: 4rem;
            grid-template-columns: 3fr 1fr;
            grid-gap: 1rem;
          }

          .title {
            grid-column: 1/3;
          }
        }
      `}</style>
    </Layout>
  )
}

export default MissionScreen
