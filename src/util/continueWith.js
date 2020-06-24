import firebase from 'util/firebase'

const continueWith = (provider) => {
  const github = new firebase.auth.GithubAuthProvider()

  if (provider === 'github') {
    return firebase.auth().signInWithPopup(github)
  }

  throw Error(`Provider ${provider} is not set up.`)
}

export default continueWith
