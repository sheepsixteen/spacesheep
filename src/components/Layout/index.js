import Head from 'next/head'
import Spinner from '@atlaskit/spinner'
import Navbar from '../Nav'
import Footer from '../Footer'
import PropTypes from 'prop-types'
import styles from './Layout.module.sass'

const Layout = (props) => {
  const { title, isLoading = false, children, hero } = props
  return (
    <>
      <Head>
        <title>{title} | SpaceSheep</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width, user-scalable=no, minimal-ui"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@atlaskit/css-reset@5.0.10/dist/bundle.css"
        />
        <link
          rel="icon"
          href="https://img.icons8.com/doodle/2x/sci-fi.png"
          type="image/png"
        />
      </Head>

      <div className="wrapper">
        <Navbar />

        <div>
          {hero}
          <div className="container">
            {children}
            {isLoading && (
              <div className='spinner-container'>
                <Spinner size="medium" />
              </div>
            )}
          </div>
        </div>

        <Footer />
      </div>

      <style jsx>{`
        .container {
          margin-top: 2rem;
          margin: 2rem auto;
          width: 95vw;
          max-width: 80rem;
        }
      
        .wrapper {
          height: 100%;
          min-height: 100vh;
          display: grid;
          grid-template-rows: auto 1fr auto;
        }

        .spinner-container {
          height: 60vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </>
  )
}

Layout.propTypes = {
  /**
   * <title> of the page
   */
  title: PropTypes.string,

  /**
   * Shows a spinner when true
   */
  loading: PropTypes.bool
}

export default Layout