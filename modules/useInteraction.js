import { useState, useEffect } from 'react'
import { useAuth } from './useAuth'
import firebase from '../modules/firebase'

/**
 * getInteraction gets an interaction from firebase
 * @param {String} eid - Entry id (id of the thing the user is interacting with)
 */
export const useInteraction = (eid) => {
  const [interaction, setInteraction] = useState(null)
  const { user, data: userdata } = useAuth()

  function updateInteraction (data) {
    setInteraction(data)
    // Update in firestore
    return firebase.firestore()
      // We write to interactions/<uid><eid>
      // This is predictable, and means we don't
      // have to read from firestore before
      // writing, saving some time.
      .doc(`interactions/${user.uid + eid}`)
      .set({
        uid: user.uid,
        username: userdata.username,
        eid,
        ...data
      }, { merge: true })
  }

  useEffect(() => {
    var unsubscribe = () => {}

    function handleInteractionSnapshot (snapshot) {
      // There should only be one doc so "forEach" just gets
      // the first doc.
      if (snapshot.empty) {
        setInteraction(false)
      }

      const doc = snapshot.docs[0]
      setInteraction({ id: doc.id, ...doc.data() })
    }

    if (user && eid) {
      unsubscribe = firebase.firestore()
        .collection('interactions')
        .where('uid', '==', user.uid)
        .where('eid', '==', eid)
        .onSnapshot(handleInteractionSnapshot)
    }

    // Cleanup
    return () => unsubscribe()
  }, [user, eid])

  return [interaction, updateInteraction]
}
