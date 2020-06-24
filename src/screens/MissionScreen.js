import { BreadcrumbsItem, BreadcrumbsStateless } from '@atlaskit/breadcrumbs'
import { ButtonGroup } from '@atlaskit/button'
import InlineMessage from '@atlaskit/inline-message'
import Tabs from '@atlaskit/tabs'
import TagGroup from '@atlaskit/tag-group'
import Tooltip from '@atlaskit/tooltip'
import CommunitySolutions from 'components/CommunitySolutions'
import { Star, WorkStatus } from 'components/Interactions'
import Log from 'components/Interactions/Log'
import Layout from 'components/Layout'
import Card from 'elements/Card'
import Source from 'elements/Source'
import Tag from 'elements/Tag'
import Link from 'next/link'
import { useState } from 'react'
import theme from 'styles/theme'
import useAuth from 'util/useAuth'
import { useInteraction } from 'util/useInteraction'

const MissionScreen = ({ mission }) => {
  const { user } = useAuth()
  const [interaction, setInteraction] = useInteraction(mission.id)
  const [selectedTab, setSelectedTab] = useState(0)

  return (
    <Layout title={mission.title}>
      <div className="layout">
        <div className="title">
          <h1>{mission.title}</h1>
        </div>

        <main>
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
          <div className="tabs">
            <Tabs
              tabs={[
                {
                  label: 'Your log',
                  content: (
                    <Log
                      interaction={interaction}
                      setInteraction={setInteraction}
                    />
                  ),
                },
                {
                  label: 'Community solutions',
                  content: <CommunitySolutions mid={mission.id} />,
                },
              ]}
            />
          </div>
        </main>

        <aside className="sidebar">
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
                    onClick={(e) => e.preventDefault()}
                    title={<p>Login to interact with this mission</p>}
                  />
                </a>
              </Link>
            )}
          </div>
        </aside>
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

        aside {
          grid-row: 2/3;
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

        .tabs {
          margin-top: 1rem;
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

          aside {
            grid-row: inherit;
          }
        }
      `}</style>
    </Layout>
  )
}

export default MissionScreen
