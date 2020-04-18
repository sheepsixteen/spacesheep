import styled from 'styled-components'
import randomColor from 'randomcolor'
import Link from 'next/link'
import Tag from '@atlaskit/tag'
import TagGroup from '@atlaskit/tag-group'
import { BreadcrumbsStateless, BreadcrumbsItem } from '@atlaskit/breadcrumbs'
import Difficulty from './Difficulty'
import Star from './Star'

// TODO: Make link be on the entire card except for the button (right now its just the text)

const MissionCard = ({
  id,
  title,
  difficulty,
  tags = [],
  source,
  noCard
}) => {
  return (
    <Card id={id} noCard={noCard}>
      <div>
        {source && (
          <BreadcrumbsStateless>
            {source.map((x, i) => (
              <BreadcrumbsItem key={'breadcrumb' + i} href={x.href} text={x.label} />
            ))}
          </BreadcrumbsStateless>
        )}

        <h3 style={{ margin: '.5rem 0' }}>
          <Link href='/m/[id]' as={'/m/' + id}>
            <a>
              {title}
            </a>
          </Link>
        </h3>

        <TagGroup>
          <Difficulty difficulty={difficulty} />
          {
            tags.map((x, i) => (
              <Link key={'tags' + i} href='/tags/[tag]' as={'/tags/' + x}>
                <Tag href={'/tags/' + x} text={'#' + x} />
              </Link>))
          }
        </TagGroup>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <Star eid={id} />
      </div>
    </Card>
  )
}

const Card = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  border: 1px solid #eee;
  border-left: 4px solid ${props => randomColor({ seed: props.id })};

  padding: 1rem;
  margin-top: -1px;
  
  ${props => props.noCard ? 'border: none; padding: 0;' : ''}

  &::after {
    content: "";
    clear: both;
    display: table;
  }

  @media screen and (min-width: 30em) {
    grid-template-columns: 1fr auto;
  }
`

export default MissionCard
