import Tag from '@atlaskit/tag'

const Difficulty = ({ difficulty }) => {
  switch (difficulty) {
    case 0:
      return <Tag color='red' text='Advanced' />
    case 1:
      return <Tag color='yellow' text='Intermediate' />
    case 2:
      return <Tag color='green' text='Beginner' />
  }
}

export default Difficulty
