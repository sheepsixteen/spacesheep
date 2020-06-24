import Button from '@atlaskit/button'
import StarOutline from '@atlaskit/icon/glyph/star'
import StarFilled from '@atlaskit/icon/glyph/star-filled'
import PropTypes from 'prop-types'

const Star = ({ interaction, setInteraction, _isStarred }) => {
  if (interaction === null) {
    return <Button isLoading />
  }

  if (_isStarred) {
    return (
      <Button iconBefore={isStarred ? <StarFilled /> : <StarOutline />}>
        {isStarred ? 'Not starred' : 'Starred'}
      </Button>
    )
  }

  const { isStarred } = interaction

  return (
    <Button
      iconBefore={isStarred ? <StarFilled /> : <StarOutline />}
      onClick={(e) => setInteraction({ isStarred: !isStarred })}
    >
      {isStarred ? 'Unstar' : 'Star'}
    </Button>
  )
}

Star.propTypes = {
  interaction: PropTypes.object,
  setInteraction: PropTypes.func,
  /**
   * If set, overrides and doesn't let user edit (useful for viewing only e.g.
   * on another user's profile page)
   */
  _isStarred: PropTypes.bool,
}

export default Star
