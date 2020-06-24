import Tag from '@atlaskit/tag'
import PropTypes from 'prop-types'

const Difficulty = ({ difficulty }) => {
  switch (difficulty) {
    case 0:
      return <Tag color="red" text="Advanced" />
    case 1:
      return <Tag color="yellow" text="Intermediate" />
    case 2:
      return <Tag color="green" text="Beginner" />
  }

  console.trace(new Error('Invalid input to <Difficulty>, ' + difficulty))
  return null
}

Difficulty.propTypes = {
  difficulty: PropTypes.oneOf([0, 1, 2]).isRequired,
}

export default Difficulty
