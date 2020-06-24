import Card from 'elements/Card'
import Spinner from 'elements/Spinner'
import PropTypes from 'prop-types'

/**
 * Log renders a little card with the user's logs of an entity
 */
const Log = ({ interaction, setInteraction }) => {
  if (interaction === null) {
    return <Spinner />
  }

  if (!setInteraction && !interaction) {
    return null
  }

  return (
    <Card header={interaction.username}>
      <textarea />
    </Card>
  )
}

Log.propTypes = {
  interaction: PropTypes.shape({
    /**
     * Id of interaction
     */
    id: PropTypes.string.isRequired,
    /**
     * Entity id
     */
    eid: PropTypes.string.isRequired,
    /**
     * User id
     */
    uid: PropTypes.string.isRequired,
    /**
     * The user's username (for faster rendering)
     */
    username: PropTypes.string.isRequired,
    /**
     * The log the user has saved so far
     */
    log: PropTypes.string,
  }),
  setInteraction: PropTypes.func,
}

export default Log
