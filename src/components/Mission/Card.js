import { BreadcrumbsItem, BreadcrumbsStateless } from '@atlaskit/breadcrumbs'
import Flag from '@atlaskit/icon/glyph/flag-filled'
import Tag from '@atlaskit/tag'
import TagGroup from '@atlaskit/tag-group'
import { colors } from '@atlaskit/theme'
import Link from 'next/link'
import PropTypes from 'prop-types'
import randomColor from 'randomcolor'
import styled from 'styled-components'

import Difficulty from '../Difficulty'
import Actions from './Actions'
import styles from './Mission.module.sass'

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
              <BreadcrumbsItem
                key={'breadcrumb' + i}
                href={x.href}
                text={x.label}
              />
            ))}
          </BreadcrumbsStateless>
        )}

        <div className={styles.title}>
          <Link href="/m/[mid]" as={`/m/${slug}`}>
            <a className={styles.card__title}>{title}</a>
          </Link>

          {tags && tags.map((tag) => <Tag key={tag} text={tag} color="grey" />)}
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
  tags: PropTypes.array,
}

export default MissionCard
