import Button from '@atlaskit/button'
import StarIcon from '@atlaskit/icon/glyph/star'
import StarFilledIcon from '@atlaskit/icon/glyph/star-filled'

const Star = ({ isInteractive = true, isStarred, setIsStarred, verbose }) => {
  // if not meant to be interactive, just return an icon
  if (isInteractive === false) {
    return isStarred ? <StarFilledIcon /> : <StarIcon />
  }

  return (
    <Button
      title="Star this mission"
      appearance={verbose ? 'default' : 'subtle'}
      onClick={(e) => setIsStarred(!isStarred)}
      iconBefore={isStarred ? <StarFilledIcon /> : <StarIcon />}
    >
      {verbose && 'Star'}
    </Button>
  )
}

export default Star
