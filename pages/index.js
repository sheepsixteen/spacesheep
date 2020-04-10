import styled from 'styled-components'
import Layout from '../components/Layout'
import Button from '@atlaskit/button'

const Home = () => (
  <Layout title='Home'>
    <TwoColumns>
      <Column>
        <Center>
          <div>
            <h1>
              Bridge the gap between theoretical programming and real-world development experience.
            </h1>
            <h2>
              Enough “Intro to X”s and “X in 10 Minutes”! Advance your programming skills with <a href='/missions'>practical examples ("missions")</a>, attend local hackathons, and get experience in a working environment.
            </h2>
            <Button appearance='primary' href='#'>
              Browse missions
            </Button>
          </div>
        </Center>
      </Column>
      <Column>
        <Center>
          <img src='/computer-cat.png' alt='Cat looking at a computer' />
        </Center>
      </Column>
    </TwoColumns>
  </Layout>
)

const HomeButton = styled(Button)`
  margin-top: 1em;
`

const TwoColumns = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
`

const Column = styled.div`
  grid-column: 1 / 3;
  
  @media screen and (min-width: 690px) {
    grid-column: span 1;
  }
`

const Center = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`

export default Home
