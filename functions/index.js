const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp()

exports.importDummy = require('./importDummy').importDummy

/**
 * Gives a user a uid
 */
exports.setUsername = functions.https.onCall(async (data, context) => {
  const { username } = data
  const uid = context.auth.uid

  if (!uid) {
    throw new functions.https.HttpsError('unauthenticated', 'Not signed in')
  }

  if (!username) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'No username provided'
    )
  }

  // Check the uid isn't already in database
  async function userExists(uid) {
    const user = await admin.firestore().collection('users').doc(uid).get()

    return user.exists
  }

  // Check if username is already in use
  async function usernameInUse(username) {
    const snapshot = await admin
      .firestore()
      .collection('users')
      .where('username', '==', username)
      .get()

    return !snapshot.empty
  }

  const checks = [userExists(uid), usernameInUse(username)]
  return Promise.all(checks).then((checks) => {
    if (checks[0] === true) {
      throw new functions.https.HttpsError(
        'already-exists',
        'You have already set a username.'
      )
    }

    if (checks[1] === true) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'Another user is.'
      )
    }

    if (checks.every((x) => x === false)) {
      // all good, create entry
      return admin.firestore().collection('users').doc(uid).set({
        picture: context.auth.token.picture,
        email: context.auth.token.email,
        username: username,
      })
    }
  })
})
