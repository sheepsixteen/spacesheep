import { BreadcrumbsItem, BreadcrumbsStateless } from '@atlaskit/breadcrumbs'
import { ButtonGroup } from '@atlaskit/button'
import { fontSize } from '@atlaskit/theme'
import MissionIcon from 'elements/MissionIcon'
import Source from 'elements/Source'
import Tag from 'elements/Tag'
import Link from 'next/link'
import useAuth from 'util/useAuth'
import { useInteraction } from 'util/useInteraction'

import Item from '../elements/Card/Item'
import { Star, WorkStatus } from './Interactions'

const MissionItem = ({ id, title, source, tags, slug }) => {
  const { user } = useAuth()
  const [interaction, setInteraction] = useInteraction(id)

  return (
    <Item>
      <div className="grid">
        <div className="icon">
          <MissionIcon />
        </div>
        <div className="content">
          {/* Source as breadcrumbs */}
          {source && <Source source={source} />}

          {/* Title + tags */}
          <h4 className="title">
            <Link href="/mission/[slug]" as={`/mission/${slug}`}>
              <a className="title">{title}</a>
            </Link>
          </h4>

          {tags &&
            tags.map((x, i) => (
              <Link key={'tags' + i} href="/tags/[tag]" as={'/tags/' + x}>
                <Tag color="grey" text={x} />
              </Link>
            ))}
        </div>
        <div className="actions">
          {user && (
            <ButtonGroup>
              <WorkStatus {...{ interaction, setInteraction }} />
              <Star {...{ interaction, setInteraction }} />
            </ButtonGroup>
          )}
        </div>
      </div>

      <style jsx>{`
        .grid {
          display: grid;
          grid-template-columns: auto 1fr;
          align-items: center;
          grid-gap: 0.5rem;
        }
        .actions {
          display: flex;
          grid-column: 2/3;
          justify-self: end;
        }
        .title {
          font-size: ${fontSize() * 1.3}px;
          margin: 0.2rem 0;
        }

        @media screen and (min-width: 690px) {
          .actions {
            display: flex;
            grid-column: 3/4;
            justify-self: end;
          }
        }
      `}</style>
    </Item>
  )
}

export default MissionItem
