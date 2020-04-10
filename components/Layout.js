import styled, { createGlobalStyle } from 'styled-components'
import Head from 'next/head'

import Page from '@atlaskit/page'
import Navbar from './Nav'
import Footer from './Footer'

const Layout = ({ title, children }) => (
  <>
    <Head>
      <title>{title} | SpaceSheep</title>
      <meta name='viewport' content='initial-scale=1.0, width=device-width, user-scalable=no, minimal-ui' />
      <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/@atlaskit/css-reset@5.0.10/dist/bundle.css' />
    </Head>

    <GlobalStyle />

    <Wrapper>
      <Navbar />

      <Page>
        <Container>
          {children}
        </Container>
      </Page>

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
  flex: 1;
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
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
`

export default Layout
