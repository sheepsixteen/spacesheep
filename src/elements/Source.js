import { BreadcrumbsItem, BreadcrumbsStateless } from '@atlaskit/breadcrumbs'
import PropTypes from 'prop-types'
import theme from 'styles/theme'

const Source = ({ source }) => {
  return (
    <ul className="breadcrumbs">
      {source.map((x, i) => (
        <li className="breadcrumb" key={'breadcrumb' + i}>
          <a href={x.href}>
            {x.label}
          </a>
        </li>
      ))}

      <style jsx>{`
        .breadcrumbs {
          padding: 0;
          margin: 0;
          display: flex;
          flex-wrap: wrap;
          list-style: none;
        }

        .breadcrumb {
          display: flex;
          margin: 0;
        }

        .breadcrumb a {
          color: ${theme.colors.subtleHeader};
        }

        .breadcrumb + .breadcrumb {
          padding-left: .4rem;
        }

        .breadcrumb + .breadcrumb::before {
          padding-right: .4rem;
          display: inline-block;
          content: '/';
          color: ${theme.colors.subtleHeader};
        }
      `}</style>
    </ul>
  )
}

Source.propTypes = {
  source: PropTypes.array,
}

export default Source
