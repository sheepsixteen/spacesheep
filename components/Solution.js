import styled from 'styled-components'
import Gist from 'react-gist'
import { useState } from 'react'
import Button from '@atlaskit/button'
import moment from 'moment'

// TODO: add link to user's profile
// TODO: add avatar (?)
const Solution = ({ id, gist, username, gist_submitted: gistSubmitted }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Card>
      <CardHeader>
        <p>
          Solution by {username}
        </p>
        <Button onClick={e => setIsOpen(!isOpen)} appearance='subtle' style={{ float: 'right' }}>
          {isOpen ? 'Hide code' : 'Show code'}
        </Button>
      </CardHeader>
      <CardBody>
        {!isOpen ? (
          <Hider isHiding onClick={e => setIsOpen(true)}>
            <Overlayer>
              Show full code
            </Overlayer>
            <Gist id={gist} />
          </Hider>
        ) : (
          <Gist id={gist} />
        )}
      </CardBody>
      {gistSubmitted && (
        <CardFooter>
          Submitted {moment(gistSubmitted.toDate()).fromNow()}
        </CardFooter>
      )}
    </Card>
  )
}

const Card = styled.div`
  border: 1px solid #eee;
  border-radius: 4px;
  margin-bottom: 1rem;
`

const CardHeader = styled.div`
  background-color: #f6f6f6;
  padding: .5rem;
  border-bottom: 1px solid #eee;

  display: flex;
  justify-content: space-between;
  align-items: center;
`

const CardBody = styled.div`
  padding: .5rem;
`

const CardFooter = styled.div`
  background-color: #f6f6f6;
  padding: .5rem;
  border-top: 1px solid #eee;
`

const Hider = styled.div`
  position: relative;
  height: 5rem;
  overflow: hidden;
`

const Overlayer = styled.div`
  position: absolute;
  background-color: rgba(1, 1, 1, 0.7);
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: rgba(1, 1, 1, 0.6);
  }
`

export default Solution
