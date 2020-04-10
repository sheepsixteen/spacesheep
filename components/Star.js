import StarFilledIcon from '@atlaskit/icon/glyph/star-filled'
import StarIcon from '@atlaskit/icon/glyph/star'
import Button, { ButtonGroup } from '@atlaskit/button'
import firebase from '../modules/firebase'
import { useEffect, useState } from 'react'

// TODO: Convert updateStars to a useEffect
const Star = ({ mid, uid, starred }) => {
  const [isStarred, setIsStarred] = useState(starred)

  const updateStars = (isStarred) => {
    firebase.firestore()
      .doc(`/users/${uid}/stars/${mid}`)
      .set({
        starred: isStarred
      })
  }

  if (!uid) {
    return <></>
  }

  return (
    <Button
      iconBefore={<>{
        isStarred
          ? <StarFilledIcon />
          : <StarIcon />
      }
      </>}
      onClick={e => { setIsStarred(!isStarred); updateStars(!isStarred) }}
    >
      {isStarred ? 'Unstar' : 'Star'}
    </Button>
  )
}

export default Star
