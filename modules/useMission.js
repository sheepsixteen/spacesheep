import { useState, useEffect } from 'react'
import firebase from './firebase'
import * as axios from 'axios'
import * as matter from 'gray-matter'
import * as MarkdownIt from 'markdown-it'

function useMission (mid) {
  const md = new MarkdownIt()

  const [mission, setMission] = useState(null)
  const [missionSnapshot, setMissionSnapshot] = useState(null)
  const [content, setContent] = useState(null)

  // Gets mission info from firebase
  useEffect(() => {
    function getMission () {
      firebase.firestore()
        .doc(`entities/${mid}`)
        .get()
        .then(snapshot => {
          setMission(snapshot.data())
          setMissionSnapshot(snapshot)
        })
    }

    if (mid) {
      getMission()
    }
  }, [mid])

  // Get mission content
  useEffect(() => {
    function getMissionData () {
      // Url is saved in firestore
      const url = missionSnapshot.data().from

      // Get the content from sheepsixteen/missions/<mission>
      axios.get(url)
        .then(raw => {
          // Extract the content (disregarding front matter)
          const matterObj = matter(raw.data)
          // Render markdown
          const html = md.render(matterObj.content)

          setContent(html)
        })
    }

    if (missionSnapshot && mid) {
      getMissionData()
    }
  }, [missionSnapshot])

  return {
    missionSnapshot,
    mission,
    content
  }
}

export default useMission
