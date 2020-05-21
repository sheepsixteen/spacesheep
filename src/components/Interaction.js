import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import firebase from '../util/firebase'
import MissionCard from './MissionCard'

const Interaction = (props) => {
  const [mission, setMission] = useState(null)

  useEffect(() => {
    firebase.firestore()
      .doc('entities/' + props.eid)
      .get()
      .then(snapshot => {
        setMission(snapshot)
      })
  }, [])

  if (!mission) {
    return null
  }

  return (
    <MissionCard id={mission.id} {...mission.data()} />
  )
}

Interaction.propTypes = {
  /**
   * The entitiy the interaction is about
   */
  eid: PropTypes.string.isRequired,

  /**
   * Is the entity starred?
   */
  isStarred: PropTypes.bool,
  /**
   * Gist id
   */
  gist: PropTypes.string,
  /**
   * Time the gist was submitted
   */
  gist_submitted: firebase.firestore.Timestamp,
  /**
   * Whether to show the mission on the user's public profile
   */
  isPublic: PropTypes.bool
}

// {"eid":"qLF2ghoJTMwg07183PtA","gist":"aaab3fed1ee13b8e194a28ea9fad597e","gist_submitted":{"seconds":1588448667,"nanoseconds":441000000},"isPublic":true,"isStarred":true,"uid":"nrgA4mjeb2N5wAMz2MIihY5kWb22"}

export default Interaction
