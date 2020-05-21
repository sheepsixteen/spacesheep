import styled from 'styled-components'
import randomColor from 'randomcolor'
import Link from 'next/link'
import Tag from '@atlaskit/tag'
import TagGroup from '@atlaskit/tag-group'
import { BreadcrumbsStateless, BreadcrumbsItem } from '@atlaskit/breadcrumbs'
import Difficulty from '../Difficulty'
import Actions from './Actions'
import PropTypes from 'prop-types'
import Flag from '@atlaskit/icon/glyph/flag-filled'
import styles from './Mission.module.sass'
import { colors } from '@atlaskit/theme'

const MissionCard = (props) => {
  const { eid, title, source, slug, tags, isInteractive } = props

  return (
    <div className={styles.card}>
      <div className={styles.icon}>
        <Flag />
      </div>
      <div className={styles.content}>
        {source && (
          <BreadcrumbsStateless>
            {source.map((x, i) => (
              <BreadcrumbsItem key={'breadcrumb' + i} href={x.href} text={x.label} />
            ))}
          </BreadcrumbsStateless>
        )}

        <div className={styles.title}>
          <Link href='/m/[mid]' as={`/m/${slug}`}>
            <a className={styles.card__title}>{title}</a>
          </Link>

          {tags && tags.map(tag => (
            <Tag
              key={tag}
              text={tag}
              color='grey'
            />
          ))}
        </div>
      </div>
      <div className={styles.actions}>
        <Actions eid={eid} />
      </div>
    </div>
  )
}

MissionCard.propTypes = {
  eid: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  source: PropTypes.array,
  isInteractive: PropTypes.bool,
  tags: PropTypes.array
}

export default MissionCard
