import { useState, useEffect } from 'react'
import { useAuth } from './useAuth'
import firebase from '../util/firebase'

export const useInteraction = (eid) => {
  const [interaction, setInteraction] = useState(null)
  const user = useAuth()

  function updateInteraction(data) {
    setInteraction({ ...interaction, ...data })
    // Update in firestore
    return (
      firebase
        .firestore()
        // We write to interactions/<uid><eid>
        // This is predictable, and means we don't
        // have to read from firestore before
        // writing, saving some time.
        .collection('interactions')
        .doc(user.uid + eid)
        .set({
          uid: user.uid,
          eid,
          ...data,
        }, { merge: true })
    )
  }

  useEffect(() => {
    if (user && eid) {
      console.log('getting from firestore')
      firebase
        .firestore()
        .collection('interactions')
        .doc(user.uid + eid)
        .get()
        .then((snapshot) => {
          if (!snapshot.exists) {
            return setInteraction({})
          }
          setInteraction({ id: snapshot.id, ...snapshot.data() })
        })
    }
  }, [user, eid])

  return [interaction, updateInteraction]
}
