import Layout from '../components/Layout'
import Button from '../components/Button'
import Link from 'next/link'

const Home = () => (
  <Layout title='404'>
    <h1>Page not found (404)</h1>
    <h2>
      We couldn't find that page.
      <Link href='/missions' passHref>
        <Button>
          Go to your missions
        </Button>
      </Link>
    </h2>
  </Layout>
)

export default Home
