import firebase from '../util/firebase'
import NotFound from './404'
import ProfileScreen from 'screens/ProfileScreen'
import Layout from 'components/Layout'
import { useEffect, useState } from 'react'
import { useDebugValue } from 'react'
import { useRouter } from 'next/router'

const Profile = () => {
  const [userData, setUserData] = useState(null)
  const router = useRouter()
  const { username } = router.query

  useEffect(() => {
    function startListening () {
      return firebase
        .firestore()
        .collection('users')
        .where('username', '==', username)
        .onSnapshot(snapshot => {
          if (snapshot.empty) {
            return setUserData(false)
          } else {
            return setUserData({
              uid: snapshot.docs[0].id,
              ...snapshot.docs[0].data(),
            })
          }
        })
    }

    let unsubscribe = () => {}

    if (username) {
      unsubscribe = startListening()
    }
    
    return () => unsubscribe()
  }, [username])

  if (userData === null) {
    return <Layout isLoading title="..." />
  }

  if (userData === false) {
    return <NotFound />
  }

  return <ProfileScreen profile={userData} />
}

// Below is what we can use once next.js figures out
// how to update the cached versions of pages on
// a webhook.

// export async function getStaticProps(context) {
//   async function getProps(username) {
//     const snapshot = await firebase
//       .firestore()
//       .collection('users')
//       .where('username', '==', username)
//       .get()

//     if (snapshot.docs[0].exists === false) {
//       return
//     }

//     return {
//       userData: {
//         uid: snapshot.docs[0].id,
//         ...snapshot.docs[0].data(),
//       },
//     }
//   }

//   return {
//     props: await getProps(context.params.username),
//     unstable_revalidate: 1,
//   }
// }

// export async function getStaticPaths() {
//   const snapshot = await firebase.firestore().collection('users').get()

//   return {
//     paths: snapshot.docs.map((doc) => ({
//       params: { username: doc.data().username },
//     })),
//     fallback: true,
//   }
// }

export default Profile
