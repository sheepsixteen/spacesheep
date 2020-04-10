import styled from 'styled-components'
import Layout from '../components/Layout'
import Button from '../components/Button'

const Home = () => (
  <Layout title='404'>
    <h1>Page not found (404)</h1>
    <h2>
      We couldn't find that page, <a href='/missions'>go back to your missions</a>?
    </h2>
  </Layout>
)

export default Home
