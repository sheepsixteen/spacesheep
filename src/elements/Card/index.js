import PropTypes from 'prop-types'
import theme from 'styles/theme'

import Item from './Item'

export {
  Item as CardItem
}

const Card = (props) => {
  return (
    <div className="card">
      <div className="card-header">{props.header}</div>
      <div className="card-body">{props.children}</div>
      <div className="card-footer"></div>

      <style jsx>{`
        .card {
          border-radius: 4px;
          border: 1px solid ${theme.colors.border}
        }

        .card-header {
          background-color: ${theme.colors.darkerBackground};
          padding: 12px;
          border-bottom: 1px solid ${theme.colors.border};
        }`}</style>
    </div>
  )
}

Card.propTypes = {
  header: PropTypes.node,
  children: PropTypes.node,
}

export default Card
