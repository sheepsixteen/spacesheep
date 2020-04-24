import firebase from './firebase'
import { useState, useEffect } from 'react'

export const useEntities = (type, collection, after) => {
  const [entities, setEntities] = useState(null)

  function handleEntities (snapshot) {
    setEntities(snapshot.docs)
  }

  function handleError (err) {
    console.error(err)
    setEntities(false)
  }

  useEffect(() => {
    console.log(after, `${collection}/${after}`)
    const r = firebase.firestore()
      .collection('entities')
      .where('type', '==', type)
      .orderBy('title')

    if (after) {
      r.startAfter(firebase.firestore().doc(`${collection}/${after}`))
        .get()
        .then(handleEntities)
        .catch(handleError)
    } else {
      r.get()
        .then(handleEntities)
        .catch(handleError)
    }
  }, [after])

  return entities
}
