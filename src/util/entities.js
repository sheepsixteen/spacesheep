import { useEffect, useState } from 'react'

import firebase from './firebase'

export const getEntities = async (type) =>
  firebase
    .firestore()
    .collection('entities')
    .where('type', '==', type)
    .orderBy('title')
    .get()

/**
 * useEntities gets entities from the database
 * @param {String} type The type of entity to bring
 * @return {Array} docs that match that type (not data)
 */
export const useEntities = (type) => {
  const [entities, setEntities] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    getEntities(type)
      .then((entities) => setEntities(entities.docs))
      .catch((err) => setError(err))
  }, [])

  return { entities, error }
}
