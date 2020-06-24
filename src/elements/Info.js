import SectionMessage from '@atlaskit/section-message'
import PropTypes from 'prop-types'

const Info = (props) => (
  <div className="space">
    <SectionMessage appearance="info">{props.children}</SectionMessage>

    <style jsx>{`
      .space {
        margin: 1rem 0;
      }
    `}</style>
  </div>
)

Info.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Info
