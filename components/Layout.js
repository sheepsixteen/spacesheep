import styled, { createGlobalStyle } from 'styled-components'
import Head from 'next/head'

import Spinner from '@atlaskit/spinner'
import Navbar from './Nav'
import Footer from './Footer'

const Layout = ({ title, loading = false, children }) => (
  <>
    <Head>
      <title>{title} | SpaceSheep</title>
      <meta name='viewport' content='initial-scale=1.0, width=device-width, user-scalable=no, minimal-ui' />
      <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/@atlaskit/css-reset@5.0.10/dist/bundle.css' />
      <link rel='icon' href='https://img.icons8.com/doodle/2x/sci-fi.png' type='image/png' />
    </Head>

    <GlobalStyle />

    <Wrapper>
      <Navbar />

      <Container>
        {children}

        {loading && (
          <SpinnerContainer>
            <Spinner size='medium' />
          </SpinnerContainer>
        )}
      </Container>

      <Footer />
    </Wrapper>
  </>
)

const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%;
  }
  body {
    font-family: -apple-system,BlinkMacSystemFont,avenir next,avenir,helvetica neue,helvetica,ubuntu,roboto,noto,segoe ui,arial,sans-serif;
  }
`

const Container = styled.div.attrs(props => ({
}))`
  margin-top: 2rem;
  margin: 2rem auto;
  width: 95vw;
  max-width: 80rem;

  @media screen and (min-width: 30em) {
    margin-top: 4rem;
  }
`

// Sticky footer
const Wrapper = styled.div`
  height: 100%;
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
`

const SpinnerContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default Layout
