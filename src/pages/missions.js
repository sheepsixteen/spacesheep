import MissionsScreen from 'screens/MissionsScreen'
import firebase from 'util/firebase'

const Missions = ({ missions }) => {
  return <MissionsScreen missions={missions} />
}

export async function getStaticProps() {
  // Note: https://nextjs.org/blog/next-9-4#incremental-static-regeneration-beta
  // says there's a change for updates on an event "Up next, we will be working
  // on [...] Re-generating by listening to events (like CMS webhooks), ahead of
  // user traffic" so this will be updated.

  const missions = await firebase
    .firestore()
    .collection('entities')
    .where('type', '==', 'mission')
    .get()

  return {
    props: {
      missions: missions.docs.map((e) => ({ ...e.data(), id: e.id })),
    },
  }
}

export default Missions
