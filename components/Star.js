import StarFilledIcon from '@atlaskit/icon/glyph/star-filled'
import StarIcon from '@atlaskit/icon/glyph/star'
import Button from '@atlaskit/button'
import { useInteraction } from '../modules/useInteraction'
import { useAuth } from '../modules/useAuth'

const Star = ({ eid }) => {
  const { user } = useAuth()
  const [interaction, setInteraction] = useInteraction(eid)

  // If not signed in, just an empty div
  if (!user) {
    return <div />
  }

  // While loading
  if (interaction === null) {
    return <Button isLoading />
  }

  return (
    <Button
      iconBefore={
        interaction.isStarred
          ? <StarFilledIcon />
          : <StarIcon />
      }
      onClick={e => setInteraction({ isStarred: !interaction.isStarred })}
    >
      {interaction.isStarred ? 'Unstar' : 'Star'}
    </Button>
  )
}

export default Star
