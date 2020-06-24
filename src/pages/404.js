import Button from '@atlaskit/button'
import { fontSize } from '@atlaskit/theme'
import Link from 'next/link'

import Layout from '../components/Layout'

const Home = () => (
  <Layout title="404">
    <h1>Page not found (404)</h1>
    <p style={{ marginBottom: '1rem', fontSize: fontSize() * 1.2 }}>
      <span>Couldn't find the requested page. </span>
    </p>

    <Link href="/missions" passHref>
      <Button appearance="primary">Go to your missions</Button>
    </Link>
  </Layout>
)

export default Home
